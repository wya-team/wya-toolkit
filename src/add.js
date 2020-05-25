import { prompt, Separator } from 'inquirer';
import chalk from 'chalk';
import shell from 'shelljs';
import upath from 'upath';
import { resolve } from 'path';

import { routeForReact, routeForVue, routeForMp } from './add/index';
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
			'routeForMp',
			// 'routeForRN'
			'none'
		],
		default: 'routeForVue'
	},
	{
		type: 'list',
		name: 'env',
		message: 'Select env:',
		when: (answers) => answers.type !== 'routeForMp',
		choices: [
			'pc',
			'mobile',
		],
		default: 'pc'
	},
	{
		type: 'input',
		name: 'project',
		message: 'Project Name:',
		when: (answers) => ['routeForVue', 'routeForMp'].includes(answers.type),
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
		when: (answers) => ['routeForVue', 'routeForMp'].includes(answers.type),
		choices: [
			new Separator(' = For template = '),
			'basic',
			'paging',
			'scroll',
			'form'
		],
		default: 'basic'
	},
	{
		type: 'list',
		name: 'pagingType',
		message: 'Select type:',
		when: (answers) => /(paging|scroll)/.test(answers.template),
		choices: [
			new Separator(' = For template = '),
			'basic',
			'tabs'
		],
		default: 'basic'
	},
	{
		type: 'list',
		name: 'pagingMode',
		message: 'Select mode:',
		when: (answers) => /(paging)/.test(answers.template),
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
		default: (answers) => upath.normalize(`${process.cwd()}/src/${answers.type !== 'routeForMp' ? 'pages/' : ''}`),
		// default: upath.normalize(`${process.cwd()}/tmp/`),
		// default: upath.normalize(`${process.cwd()}/tmp/src/pages/`),
		validate (val) {
			if (val === `${process.cwd()}/tmp/`) {
				// shell.rm('-rf', 'tmp');
			}
			return true;
		}
	},
	
];

const fn = (res, force) => {
	try {
		switch (res.type) {
			case "routeForReact":
				routeForReact(res);
				break;
			case "routeForVue":
				routeForVue(res, force);
				// console.log(res);
				break;
			case "routeForMp":
				routeForMp(res, force);
				// console.log(res);
				break;
			default:
				log('need to do!');
				break;
		}
	} catch (e) {
		console.log(e);
	}

};

const transform = (arr = []) => {
	let result = {
		template: ['form', 'basic', 'paging', 'scroll'].includes(arr[0]) ? arr[0] : undefined,
		pagingType: ['tabs', 'basic'].includes(arr[1]) ? arr[1] : undefined,
		pagingMode: ['native', 'piece', 'table'].includes(arr[2]) ? arr[2] : undefined,
	};
	return result; ;
};

const loopMake = (opts) => {
	let config = require(resolve(process.cwd(), opts.config));
	const { routes, ...rest } = config.default || config;
	config.routes.forEach((item, index) => {
		fn({ ...rest, ...item, ...transform(item.template) }, true);
	});
};
const stream = (opts) => {
	return opts.config
		? loopMake(opts)
		: prompt(question).then(fn);
};

export default stream;
