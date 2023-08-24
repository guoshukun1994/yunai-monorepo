const path = require('path');
const fs = require('fs-extra');

const ora = require('ora');
const inquirer = require('inquirer');

const downloadGitRepo = require('download-git-repo');
const util = require('util');

const { getRepolist } = require('./http');

async function wrapLoading(fn, message, ...args) {
    const spinner = ora(message);

    spinner.start();

    try {
        const result = await fn(...args);
        console.log({ result });
        spinner.succeed();
        return result;
    } catch (e) {
        console.log({ e });
        spinner.fail('Request failed ......');
    }
}

class Generator {
    constructor(name, target, ask) {
        this.name = name;
        this.target = target;
        this.ask = ask;
        this.downloadGitRepo = util.promisify(downloadGitRepo);
    }

    async getRepo() {
        const repolist = await wrapLoading(getRepolist, 'waiting fetch template');
        if (!repolist) return;

        const repos = repolist.map(item => item.name);

        const { repo } = await inquirer.prompt({
            name: 'repo',
            type: 'list',
            choices: repos,
            message: 'Please choose a template'
        });

        return repo;
    }

    async download(repo) {
        const requestUrl = `yunai-cli/${repo}`;
        await wrapLoading(
            this.downloadGitRepo,
            'waiting download template',
            requestUrl,
            path.resolve(process.cwd(), this.target)
        )
    }

    // 文件入口，在create.js 中 执行 generator.create();
    async create() {
        const repo = await this.getRepo();
        console.log('用户选择了', repo);

        await this.download(repo);

        let targetPath = path.resolve(process.cwd(), this.target);

        let jsonPath = path.join(targetPath, 'package.json');

        if (fs.existsSync(jsonPath)) {
            const data = fs.readFileSync(jsonPath).toString();
            let json = JSON.parse(data);
            json.name = this.name;

            Object.keys(this.ask).forEach((item) => {
                json[item] = this.ask[item];
            });

            fs.writeFileSync(jsonPath, JSON.stringify(json, null, '\t'), 'utf-8');
        }
    }
}

module.exports = Generator;