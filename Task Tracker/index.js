#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const { exec } = require('child_process')

program
.version('1.0.0')
.description('A CLI app test using Node.js')
.option('-n --name <name>', 'Provide a name')
.option('-g --greet', 'Greet the user')
.option('-r --read', 'List all the Tasks')
.parse(process.argv);

const options = program.opts();

if (options.name) {
    console.log(`Hello, ${options.name}!`);
}

if (options.greet) {
    console.log("Greetings genteman!");
}

if (options.read) {
    fs.readFile("./tasks.json", "utf8", (error, data) => {
        if (error) {
            // if the file doesn't exist, create a new file in the folder
            if (error.errno == -2) {
                createFile();
            } else {
                console.log(error)
            }
        } else {
            console.log(JSON.parse(data));
        }
    });
}

if (!options.name && !options.greet && !options.read) {
    console.log('No options provided. Try --name or --greet.');
}


function createFile() {
    exec('touch tasks.json', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        
        console.log('tasks.json not found, it has been successfully.');
    });
}