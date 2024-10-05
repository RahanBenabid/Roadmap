#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs').promises;
const path = require('path');

// Constants
const TASKS_FILE = './tasks.json';
const TASK_STATUSES = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done'
};

// Utility functions
const handleError = (error, customMessage) => {
  console.error(`${customMessage}: ${error.message}`);
  process.exit(1);
};

const readTasks = async () => {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const initialData = { tasks: [] };
      await writeTasks(initialData);
      return initialData;
    }
    throw error;
  }
};

const writeTasks = async (data) => {
  const taskJSON = JSON.stringify(data, null, 2);
  await fs.writeFile(TASKS_FILE, taskJSON);
  return data;
};

// Task management functions
const findTask = (tasks, id) => {
  const taskId = parseInt(id);
  return {
    task: tasks.find(task => task.id === taskId),
    taskIndex: tasks.findIndex(task => task.id === taskId)
  };
};

// Command handlers
const addTask = async (title) => {
  const allTasks = await readTasks();
  const newTask = {
    id: Date.now(),
    title,
    createdAt: new Date().toISOString(),
    status: TASK_STATUSES.TODO,
  };
  allTasks.tasks.push(newTask);
  return writeTasks(allTasks);
};

const updateTaskStatus = async (id, status) => {
  const allTasks = await readTasks();
  const { task } = findTask(allTasks.tasks, id);
  
  if (!task) {
    console.log(`No task found with ID ${id}`);
    return allTasks;
  }
  
  task.status = status;
  return writeTasks(allTasks);
};

const updateTaskTitle = async (id, newTitle) => {
  const allTasks = await readTasks();
  const { task } = findTask(allTasks.tasks, id);
  
  if (!task) {
    console.log(`No task found with ID ${id}`);
    return allTasks;
  }
  
  task.title = newTitle;
  return writeTasks(allTasks);
};

const deleteTask = async (id) => {
  const allTasks = await readTasks();
  const { taskIndex } = findTask(allTasks.tasks, id);
  
  if (taskIndex === -1) {
    console.log(`No task found with ID ${id}`);
    return allTasks;
  }
  
  allTasks.tasks.splice(taskIndex, 1);
  return writeTasks(allTasks);
};

const getTask = async (id) => {
  const allTasks = await readTasks();
  const { task } = findTask(allTasks.tasks, id);
  return task || null;
};

// CLI commands setup
program
.version('1.0.0')
.description('An elegant CLI task manager');

program
.command('add <title>')
.description('Add a new task')
.action(async (title) => {
  try {
    const result = await addTask(title);
    console.log('Task added successfully:', result.tasks.slice(-1)[0]);
  } catch (error) {
    handleError(error, 'Failed to add task');
  }
});

program
.command('update <id> <newTitle>')
.description('Update a task title')
.action(async (id, newTitle) => {
  try {
    const result = await updateTaskTitle(id, newTitle);
    console.log('Task updated successfully:', result);
  } catch (error) {
    handleError(error, 'Failed to update task');
  }
});

program
.command('mark-in-progress <id>')
.description('Mark task as in-progress')
.action(async (id) => {
  try {
    await updateTaskStatus(id, TASK_STATUSES.IN_PROGRESS);
    console.log(`Task ${id} marked as in-progress`);
  } catch (error) {
    handleError(error, 'Failed to update task status');
  }
});

program
.command('mark-done <id>')
.description('Mark task as done')
.action(async (id) => {
  try {
    await updateTaskStatus(id, TASK_STATUSES.DONE);
    console.log(`Task ${id} marked as done`);
  } catch (error) {
    handleError(error, 'Failed to update task status');
  }
});

program
.command('list []')
.description('List all tasks')
.action(async (type) => {
  try {
    const data = await readTasks();
    switch (type) {
      case 'done':
        doneData = data.tasks.filter((task) => task.status === 'done');
        console.table(doneData);
        break;
      case 'in-progress':
        inProgressData = data.tasks.filter((task) => task.status === 'in-progress');
        console.table(inProgressData);
        break;
      case 'todo':
        todoData = data.tasks.filter((task) => task.status === 'todo');
        console.table(todoData);
        break;
      default:
        console.table(data.tasks);
        break;
    }
  } catch (error) {
    handleError(error, 'Failed to list tasks');
  }
});

program
.command('delete <id>')
.description('Delete a task')
.action(async (id) => {
  try {
    const result = await deleteTask(id);
    console.log('Task deleted successfully. Updated tasks:', result);
  } catch (error) {
    handleError(error, 'Failed to delete task');
  }
});

program
.command('get <id>')
.description('Get task by ID')
.action(async (id) => {
  try {
    const task = await getTask(id);
    if (task) {
      console.log('Found task:', task);
    } else {
      console.log(`No task found with ID ${id}`);
    }
  } catch (error) {
    handleError(error, 'Failed to get task');
  }
});

program.parse(process.argv);