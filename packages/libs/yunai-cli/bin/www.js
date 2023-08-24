#! /usr/bin/env node

// console.log('link 成功')
const {program} = require('commander');

program
    .command('create <app-name>')
    .description('create a new project')
    .option('-f, --force', 'overwrite target if it exist')
    .action((name, options) => {
       require('./create')(name,options); 
    });

    program.parse();