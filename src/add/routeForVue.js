import { prompt, Separator } from 'inquirer';
import upath from 'upath';
import chalk from 'chalk';
const log = console.log;
import fs, { writeFile } from 'fs-extra';
import { resolve, join } from 'path';
import * as tpl from './templates/vue/index';
import * as tplOverride from './templates/vue/override/index';
export const routeForVue = (path, dir, project) => {
	let pathArr = path.replace(/\({0,}\//g, '-')
		.replace(/([a-z\dA-Z])([A-Z])/g, '$1-$2')
		.toLowerCase()
		.split('-')
		.filter(item => item && !item.includes(':'));

	// 0
	if (pathArr.length === 0) return;
	// 1
	if (pathArr.length === 1) pathArr[1] = 'main';

	/**
	 * container mutation reducer component
	 */
	let container = pathArr.join('-');
	let mutation = pathArr[0];
	let module = pathArr.slice(1).join('-');
	let component = `__tpl__`;
	let obj = {
		router: {
			name: container,
			path: upath.normalize(`${dir}containers/${pathArr[0]}/app.js`)
		},
		container: {
			name: container,
			path: upath.normalize(`${dir}containers/${pathArr[0]}/modules/${container}.vue`)
		},
		component: {
			name: component,
			path: upath.normalize(`${dir}components/${pathArr[0]}/${module}/${component}.vue`)
		},
		/**
		 * strore
		 */
		mutation: {
			name: mutation,
			path: upath.normalize(`${dir}stores/mutations/${mutation}.js`)
		},
		api: {
			name: mutation,
			path: upath.normalize(`${dir}stores/apis/${mutation}.js`)
		},
		module: {
			name: module,
			path: upath.normalize(`${dir}stores/modules/${mutation}/${module}.js`)
		},
		rootModule: {
			name: module,
			path: upath.normalize(`${dir}stores/modules/${mutation}/root.js`)
		}
	};

	let overrides = {
		rootApi: {
			path: upath.normalize(`${dir}stores/apis/root.js`)
		},
		rootRoute: {
			path: upath.normalize(`${dir}routers/routes.js`)
		},
		rootModules: {
			path: upath.normalize(`${dir}stores/modules/root.js`)
		}
	};


	let names = Object.keys(obj);
	// log
	names.forEach(key => log(chalk`{green ${key}}: {rgb(255,131,0) ${obj[key].path}}`));

	let question = {
		type: 'confirm',
		name: 'sure',
		message: 'Please make sure ~',
		default: false
	};
	return prompt(question)
		.then((res) => {
			if (!res.sure) return null;
			chalk('waiting...');
			names.forEach(key => {
				let { name, path } = obj[key];
				let fullpath = join(path);

				let content = '';
				content += `/**\n`;
				content += ` * ${name}\n`;
				content += ` */`;
				if (!fs.existsSync(fullpath)) {
					// 文件不存在的情况下操作
					log(chalk`{green ${key}}: {rgb(255,131,0) created}`);
					fs.outputFileSync(
						fullpath,
						typeof tpl[key] === 'function'
							? tpl[key]({ name, mutation, pathArr, project, module, obj })
							: content
					);
				} else if (typeof tpl[`${key}Override`] === 'function') {
					// 文件存在，重写相关
					log(chalk`{yellow ${key}}: {rgb(255,131,0) override}`);
					fs.outputFileSync(
						fullpath,
						tpl[`${key}Override`](
							fs.readFileSync(fullpath, 'utf-8'),
							{ name, mutation, pathArr, project, module, obj }
						)
					);
				}
			});

			Object.keys(overrides).forEach(key => {
				let { path } = overrides[key];
				let fullpath = join(path);
				if (fs.existsSync(fullpath) && typeof tplOverride[key] === 'function') {
					// 文件存在，重写相关
					log(chalk`{yellow ${key}}: {rgb(255,131,0) override}`);

					fs.outputFileSync(
						fullpath,
						tplOverride[key](
							fs.readFileSync(fullpath, 'utf-8'),
							{ mutation, pathArr, project, module, obj }
						)
					);
					
				}
				
			});
		})
		.catch(e => {
			log(chalk`{red ${e}}`);
		});
};
