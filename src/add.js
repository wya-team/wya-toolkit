import { prompt, Separator } from 'inquirer';
import chalk from 'chalk';
import { routeforReact } from './add/index';
const log = console.log;
const question = [
	{
		type: 'list',
		name: 'type',
		message: 'Select type:',
		choices: [
			new Separator(' = For project = '),
			'routeforReact',
			'routeforWechat',
			'routeforRN'
		],
		default: 'routeforReact'
	},
	{
		type: 'input',
		name: 'path',
		message: 'RoutePath is required:',
		default: '/home',
		when: (answers) => answers.type === 'routeforReact',
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
		when: (answers) => answers.type === 'routeforReact',
		// default: `${process.cwd()}/src/pages/`
		default: `${process.cwd()}/tmp/`
	},
];

const stream = prompt(question).then(({ type, path, dir }) => {
	// 目前只有一个route
	switch (type) {
		case "routeforReact":
			routeforReact(path, dir);
			break;
		default:
			log('need to do!');
			break;
	}

});

export default stream;
