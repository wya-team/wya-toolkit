import { prompt, Separator } from 'inquirer';
import upath from 'upath';
import chalk from 'chalk';
const log = console.log;
import fs, { writeFile } from 'fs-extra';
import { resolve, join } from 'path';
import * as tpl from './templates/vue/index';
import * as rootTpl from './templates/vue/root/index';
import * as pagingTpl from './templates/vue/paging/index';
import * as formTpl from './templates/vue/form/index';

export const routeForVue = ({ path, dir, project, template, pagingMode, pagingType, extra = '', title = '' }, force) => {
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

	let basicConfig = {
		router: {
			path: upath.normalize(`${dir}containers/${pathArr[0]}/app.js`)
		},
		container: {
			path: upath.normalize(`${dir}containers/${pathArr[0]}/modules/${container}.vue`)
		},
		component: {
			path: upath.normalize(`${dir}components/${pathArr[0]}/${module}/__tpl__.vue`)
		},
		/**
		 * strore
		 */
		// mutation: {
		// 	path: upath.normalize(`${dir}stores/mutations/${mutation}.js`)
		// },
		api: {
			path: upath.normalize(`${dir}stores/apis/${mutation}.js`)
		},
		module: {
			path: upath.normalize(`${dir}stores/modules/${mutation}/${module}.js`)
		},
		rootModule: {
			path: upath.normalize(`${dir}stores/modules/${mutation}/root.js`)
		}
	};

	let rootConfig = {
		rootApi: {
			path: upath.normalize(`${dir}stores/apis/root.js`)
		},
		rootRoute: {
			path: upath.normalize(`${dir}routers/routes.dist.js`)
		},
		_rootRoute: {
			path: upath.normalize(`${dir}routers/routes.dev.js`)
		},
		rootModules: {
			path: upath.normalize(`${dir}stores/modules/root.js`)
		}
	};

	let pagingConfig = {
		// mutation: basicConfig.mutation,
		api: basicConfig.api,
		module: basicConfig.module,
		container: basicConfig.container,
		filter: {
			path: upath.normalize(`${dir}components/${pathArr[0]}/${module}/filter.vue`)
		},
		item: {
			path: upath.normalize(`${dir}components/${pathArr[0]}/${module}/item.vue`)
		},
		list: {
			path: upath.normalize(`${dir}components/${pathArr[0]}/${module}/${pagingType === 'tabs' ? 'tabs-' : ''}list.vue`)
		}
	};

	let formConfig = {
		container: basicConfig.container,
		component: {
			path: upath.normalize(`${dir}components/${pathArr[0]}/${module}/content.vue`)
		},
	};

	// log
	Object.keys(basicConfig).forEach(key => log(chalk`{green ${key}}: {rgb(255,131,0) ${basicConfig[key].path}}`));

	let question = {
		type: 'confirm',
		name: 'sure',
		message: 'Please make sure ~',
		default: false
	};
	let fn = () => {
		log(chalk('waiting...'));
		Object.keys(basicConfig).forEach(key => {
			let { path } = basicConfig[key];
			let fullpath = join(path);

			let content = '';
			content += `/**\n`;
			content += ` * 请注释相关信息\n`;
			content += ` */`;
			if (!fs.existsSync(fullpath)) {
				// 文件不存在的情况下操作
				log(chalk`{green ${key}}: {rgb(255,131,0) created}`);
				fs.outputFileSync(
					fullpath,
					typeof tpl[key] === 'function'
						? tpl[key]({ mutation, path, pathArr, project, module, extra, title  })
						: content
				);
			} else if (typeof tpl[`${key}Override`] === 'function') {
				// 文件存在，重写相关
				log(chalk`{yellow ${key}}: {rgb(255,131,0) override}`);
				fs.outputFileSync(
					fullpath,
					tpl[`${key}Override`](
						fs.readFileSync(fullpath, 'utf-8'),
						{ mutation, path, pathArr, project, module, extra, title  }
					)
				);
			}
		});

		Object.keys(rootConfig).forEach(key => {
			let { path } = rootConfig[key];
			let _key = key.replace(/\_/g, '');

			let fullpath = join(path);
			if (fs.existsSync(fullpath) && typeof rootTpl[_key] === 'function') {
				// 文件存在，重写相关
				log(chalk`{yellow ${key}}: {rgb(255,131,0) override}`);

				fs.outputFileSync(
					fullpath,
					rootTpl[_key](
						fs.readFileSync(fullpath, 'utf-8'),
						{ mutation, pathArr, project, module, extra, title  }
					)
				);
				
			}
		});
		if (template === 'paging') {
			fs.removeSync(basicConfig.component.path);

			Object.keys(pagingConfig).forEach(key => {
				let { path } = pagingConfig[key];
				let fullpath = join(path);
				if (typeof pagingTpl[key] === 'function') {
					log(chalk`{yellow ${key}}: {rgb(255,131,0) ${fs.existsSync(fullpath) ? 'override' : 'created'}}`);

					fs.outputFileSync(
						fullpath,
						pagingTpl[key](
							fs.existsSync(fullpath) ? fs.readFileSync(fullpath, 'utf-8') : '',
							{ mutation, pathArr, project, module, pagingMode, pagingType, extra, title }
						)
					);
					
				}
			});
		}

		if (template === 'form') {
			fs.removeSync(basicConfig.component.path);

			Object.keys(formConfig).forEach(key => {
				let { path } = formConfig[key];
				let fullpath = join(path);
				if (typeof formTpl[key] === 'function') {
					log(chalk`{yellow ${key}}: {rgb(255,131,0) ${fs.existsSync(fullpath) ? 'override' : 'created'}}`);

					fs.outputFileSync(
						fullpath,
						formTpl[key](
							fs.existsSync(fullpath) ? fs.readFileSync(fullpath, 'utf-8') : '',
							{ mutation, pathArr, project, module, extra, title  }
						)
					);
					
				}
			});
		}

	};
	return force 
		? fn()
		: prompt(question)
			.then((res) => {
				if (!res.sure) return null;
				fn();
			})
			.catch(e => {
				log(chalk`{red ${e}}`);
			});
};
