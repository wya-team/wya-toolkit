import { prompt, Separator } from 'inquirer';
import fs, { writeFile } from 'fs-extra';
import chalk from 'chalk';
import download from 'download-git-repo';
import ora from 'ora';
import { resolve, join } from 'path';

const log = console.log;
const question = [
	{
		type: 'input',
		name: 'project',
		message: 'Project name:',
		validate (val) {
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
		default: './'
	},
	{
		type: 'list',
		name: 'repository',
		message: 'Select repository:',
		choices: [
			new Separator(' = For js project = '),
			'wya-team/vue-env#master',
			'wya-team/react-env#master',
			'wya-team/rn-env#master',
			'wya-team/wechat-env#master',
			'wya-team/wya-webpack#master',
			'wya-team/wya-rollup#master',

			new Separator(' = For native project = '),
			'wya-team/android-env#master',
			'wya-team/android-template#master',
			'wya-team/WYAiOSEnv#master',
			'wya-team/WYAiOSTemplate#master',
			'wya-team/WYASwiftEnv#master',
			'wya-team/WYASwiftTemplate#master',

			'none'
		],
		default: 'none'
	},
	{
		type: 'input',
		name: 'repository',
		message: 'Input repository',
		when: (answers) => answers.repository === 'none',
		validate (val) {
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
		let { project, repository, place } = opts;
		const spinner = ora('Downloading repository...');
		
		spinner.start();

		download(`${repository}`, `${place}/${project}`, (err) => {
			if (err) {
				log(chalk.red(err));
				process.exit();
			}
			spinner.stop();
			log(chalk.green('New project has been initialized successfully!'));
		});
		

	})
	.catch(e => {
		log(chalk`{red ${e}}`);
	});

export default stream;