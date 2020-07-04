const { prompt, Separator } = require('inquirer');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const { resolve, join } = require('path');
const { downloadFromGithub } = require('@wya/toolkit-utils');

const { writeFile } = fs;
const log = console.log;
const question = [
	{
		type: 'input',
		name: 'project',
		message: 'Project name:',
		validate(val) {
			if (val !== '') {
				return true;
			}
			return 'Project name is required!';
		}
	},
	{
		type: 'input',
		name: 'place',
		message: 'Where to init the project:',
		default: process.cwd()
	},
	{
		type: 'list',
		name: 'repo',
		message: 'Select repository:',
		choices: [
			new Separator(' = For js project = '),
			'wya-team/vue-env#master?path=templates',
			'wya-team/wechat-env#master?path=templates',
			'none'
		],
		default: 'none'
	},
	{
		type: 'input',
		name: 'repo',
		message: 'Input repository',
		when: (answers) => answers.repo === 'none',
		validate(val) {
			if (val.includes("#") && val.includes("/")) {
				return true;
			}
			return 'Input repository is required and has branch(**/**#master)';
		}
	}
];

const stream = prompt(question)
	.then((opts = {}) => {
		// options
		let { project, place, repo } = opts;
		
		let options = {
			owner: repo.replace(/([^/]+).*/, '$1'),
			repo: repo.replace(/.*\/([^#]+).*/, '$1'),
			ref: repo.replace(/.*#([^?]+).*/, '$1'),
			path: repo.replace(/.*path=([\s\S]+)/, '$1'),
			dest: `${place}/${project}`
		};
		log(chalk`{yellow ${JSON.stringify(options, null, '\t')}}`);
		downloadFromGithub(options);
	})
	.catch(e => {
		log(chalk`{red ${e}}`);
	});

module.exports = stream;