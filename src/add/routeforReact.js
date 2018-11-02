import { prompt, Separator } from 'inquirer';
import upath from 'upath';
import chalk from 'chalk';
const log = console.log;
import fs, { writeFile } from 'fs-extra';
import { resolve, join } from 'path';
import * as tpl from './templates/react/index';
export const routeForReact = ({ path, dir }) => {
	let pathArr = path.replace(/\({0,}\//g, '-')
		.replace(/([a-z\dA-Z])([A-Z])/g, '$1-$2')
		.toLowerCase()
		.split('-')
		.filter(item => item && !item.includes(':'));
	// 0
	if (pathArr.length === 0) return;
	// 1
	if (pathArr.length === 1) pathArr[1] = 'main';

	let componentArr = pathArr.map(item => `${item[0].toUpperCase()}${item.slice(1)}`);

	/**
	 * container action reducer component
	 */
	let container = componentArr.join('');
	let action = pathArr[0];
	let reducer = `${pathArr[1]}${componentArr.slice(2).join('')}`;
	let component = `__tpl__`;
	let obj = {
		router: {
			name: container,
			path: upath.normalize(`${dir}containers/${componentArr[0]}/App.js`)
		},
		container: {
			name: container,
			path: upath.normalize(`${dir}containers/${componentArr[0]}/Modules/${container}.js`)
		},
		component: {
			name: component,
			path: upath.normalize(`${dir}components/${componentArr[0]}/${componentArr.slice(1).join('')}/${component}.js`)
		},
		action: {
			name: action,
			path: upath.normalize(`${dir}constants/actions/${action}.js`)
		},
		creator: {
			name: action,
			path: upath.normalize(`${dir}actions/${action}.js`)
		},
		api: {
			name: action,
			path: upath.normalize(`${dir}constants/api/${action}.js`)
		},
		reducer: {
			name: reducer,
			path: upath.normalize(`${dir}reducers/${action}/${reducer}.js`)
		},
		rootReducer: {
			name: reducer,
			path: upath.normalize(`${dir}reducers/${action}/root.js`)
		}
	};
	let names = Object.keys(obj);
	// log
	names.forEach(key => log(chalk`{green ${key}}: {rgb(255,131,0) ${obj[key].path}}`));

	let question = {
		type: 'confirm',
		name: 'sure',
		message: 'Please make sure ~',
		default: true
	};
	return prompt(question)
		.then((res) => {
			if (!res.sure) return null;
			names.forEach(key => {
				let { name, path } = obj[key];
				let fullpath = join(path);

				let contents = '';
				contents += `/**\n`;
				contents += ` * ${name}\n`;
				contents += ` */`;
				// 文件不存在的情况下操作
				if (!fs.existsSync(fullpath)) {
					fs.outputFileSync(
						fullpath,
						typeof tpl[key] === 'function'
							? tpl[key]({ name, action, pathArr, componentArr, obj })
							: contents
					);
				}
			});
		})
		.catch(e => {
			log(chalk`{red ${e}}`);
		});
};
