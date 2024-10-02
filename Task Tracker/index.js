#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs').promises;
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const path = './tasks.json';

program
  .version('1.0.0')
  .description('A CLI app test using Node.js')
  .option('-a --add <task>', 'Provide a task')
  .option('-s --status <mark>', 'Provide the stat')
  .option('-g --get <id>', 'Get a task using the ID')
  .option('-l --list', 'List all the Tasks')
  .option('-d --delete <id>', 'Delete a task using its ID')
  .option('-u --update <id> <task>', 'update a task using the ID')
  .parse(process.argv);

const options = program.opts();

async function writeFile(data) {
  try {
    const taskJSON = JSON.stringify(data, null, 2);
    await fs.writeFile(path, taskJSON);
    console.log('Data written successfully to the disk');
  } catch (error) {
    console.log('An error has occurred while writing the file ', error);
  }
}

async function readFile() {
  try {
    const data = await fs.readFile(path, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const initialData = { tasks: [] };
      await writeFile(initialData);
      return initialData;
    }
    console.error('Error reading file:', error);
    return { tasks: [] };
  }
}

async function createFile() {
  try {
    const initialData = { tasks: [] };
    await writeFile(initialData);
    console.log('tasks.json created successfully with empty tasks array.');
  } catch (error) {
    console.error(`Error creating file: ${error.message}`);
  }
}

async function getTask (id) {
  const allTasks = await readFile();
  const task = allTasks.tasks.find(task => task.id === parseInt(id));
  
  if(task) {
    return task;
  } else {
    return null;
  }
}

async function deleteTask (id) {
  const allTasks = await readFile();
  taskIndex = allTasks.tasks.find(task => task.id === id);
  
  if (taskIndex === -1) {
    return null;
  }
  
  allTasks.tasks.splice(taskIndex, 1);
  await writeFile(allTasks);
  return allTasks;
}

async function main() {
  
  // add a task
  if (options.add) {
    const allTasks = await readFile();
    const newTask = {
      id: Date.now(),
      title: options.add,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    
    allTasks.tasks.push(newTask);
    await writeFile(allTasks); // Added await here
  }

  // get a task using the ID
  if (options.get) {
    const task = await getTask(options.get);
    if(task) {
      console.log('Found task:', task);
    } else {
      console.log(`No task found with ID ${options.get}`);
    }
  }

  // get all the tasks
  if (options.list) {
    const data = await readFile();
    console.log(data);
  }
  
  // delete a task using the ID (should be index for more ease of use)
  if (options.delete) {
    const id = parseInt(options.delete)
    const newTasks = await deleteTask(id);
    console.log('new updated Tasks:\n', newTasks);
  }
  
}

main().catch(error => {
  console.error('An error occurred:', error);
});