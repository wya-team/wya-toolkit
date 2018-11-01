import { prompt, Separator } from 'inquirer';
import chalk from 'chalk';
import shell from 'shelljs';
import { routeForReact, routeForVue } from './add/index';
const log = console.log;
const question = [
	{
		type: 'list',
		name: 'type',
		message: 'Select type:',
		choices: [
			new Separator(' = For project = '),
			'routeForVue',
			'routeForReact',
			// 'routeForWechat',
			// 'routeForRN'
			'none'
		],
		default: 'routeForVue'
	},
	{
		type: 'input',
		name: 'project',
		message: 'Project Name:',
		when: (answers) => answers.type === 'routeForVue',
		default: 'tpl',
		validate (val) {
			if (val === '') {
				return 'Project Name is required!';
			} else {
				return true;
			}
		}
	},
	{
		type: 'input',
		name: 'path',
		message: 'RoutePath is required:',
		default: '/home',
		when: (answers) => answers.type !== 'none',
		validate (val) {
			if (val === '') {
				return 'Name is required!';
			} else {
				return true;
			}
		}
	},
	{
		type: 'input',
		name: 'dir',
		message: 'Where to in the project:',
		when: (answers) => answers.type !== 'none',
		// default: `${process.cwd()}/src/pages/`
		default: `${process.cwd()}/tmp/`,
		validate (val) {
			if (val === `${process.cwd()}/tmp/`) {
				shell.rm('-rf', 'tmp');
			}
			return true;
		}
	},
	
];

const stream = prompt(question).then(({ type, path, dir, project }) => {
	switch (type) {
		case "routeForReact":
			routeForReact(path, dir);
			break;
		case "routeForVue":
			routeForVue(path, dir, project);
			break;
		default:
			log('need to do!');
			break;
	}

});

export default stream;
