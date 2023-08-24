const path = require('path');
const fs = require('fs-extra');
const Generator = require('./generator');
const inquirer = require('inquirer');

module.exports = async function (name, options) {
    const cwd = process.cwd();
    const targetAir = path.join(cwd, name);

    if (fs.existsSync(targetAir)) {
        if (options.force) {
            await fs.remove(targetAir);
        } else {
            let { action } = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: 'Target already exists',
                    choices: [
                        {
                            name: 'overwrite',
                            value: 'overwrite',
                        },
                        {
                            name: 'cancel',
                            value: false
                        }
                    ]
                }
            ]);
            if (!action) {
                return;
            } else {
                await fs.remove(targetAir);
            }
        }
    }

    const args = require('./ask');

    const ask = await inquirer.prompt(args);
    const generator = new Generator(name, targetAir, ask);
    generator.create();
}