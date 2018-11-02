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
		validate (val) {
			if (val === '') {
				return 'Project Name is required!';
			} else {
				return true;
			}
		}
	},
	{
		type: 'list',
		name: 'template',
		message: 'Select template:',
		when: (answers) => answers.type === 'routeForVue',
		choices: [
			new Separator(' = For template = '),
			'basic',
			'paging'
		],
		default: 'basic'
	},
	{
		type: 'list',
		name: 'mode',
		message: 'Select mode:',
		when: (answers) => answers.template === 'paging',
		choices: [
			new Separator(' = For template = '),
			'table',
			'piece',
			'native'
		],
		default: 'table'
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
		// default: `${process.cwd()}/src/pages/`,
		// default: `${process.cwd()}/tmp/`,
		default: `${process.cwd()}/tmp/src/pages/`,
		validate (val) {
			if (val === `${process.cwd()}/tmp/`) {
				shell.rm('-rf', 'tmp');
			}
			return true;
		}
	},
	
];

const stream = prompt(question).then((res) => {
	switch (res.type) {
		case "routeForReact":
			routeForReact(res);
			break;
		case "routeForVue":
			routeForVue(res);
			break;
		default:
			log('need to do!');
			break;
	}

});

export default stream;
