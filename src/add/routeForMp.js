import { prompt, Separator } from 'inquirer';
import upath from 'upath';
import chalk from 'chalk';
const log = console.log;
import fs, { writeFile } from 'fs-extra';
import { resolve, join } from 'path';
import * as tpl from './templates/mp/index';
import * as rootTpl from './templates/mp/root/index';
import * as scrollTpl from './templates/mp/scroll/index';
import * as formTpl from './templates/mp/form/index';

export const routeForMp = ({ env, path, dir, project, template, packageName, pagingMode, pagingType, extra = '', title = '' }, force) => {
	let pathArr = path.replace(/\({0,}\//g, '#')
		.replace(/([a-z\dA-Z])([A-Z])/g, '$1#$2')
		.toLowerCase()
		.split('#')
		.filter(item => item && !item.includes(':'));

	// 路由temp
	let route = path;
	// 0
	if (pathArr.length === 0) return;
	// 1
	if (pathArr.length === 1) {
		pathArr[1] = 'main';
		route = `${path}/main`;
	};

	/**
	 * container mutation reducer component
	 */
	let mutation = packageName === 'pages' ? pathArr[0] : `${packageName.split('-')[1]}-${pathArr[0]}`;
	let humpMutation = mutation.split('-').map((it, index) => index === 0 ? it : `${it[0].toUpperCase()}${it.slice(1)}`).join('');
	let module = pathArr.slice(1).join('-');

	const packageRoute = packageName === 'pages' ? packageName : `${packageName}/pages`;
	let basicConfig = {
		page: {
			path: upath.normalize(`${dir}${packageRoute}/${pathArr[0]}/${module}.wya`)
		},
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
		rootModules: {
			path: upath.normalize(`${dir}stores/modules/root.js`)
		},
		rootApp: {
			path: upath.normalize(`${dir}app.json`)
		}
	};

	let formConfig = {
		page: basicConfig.page,
	};


	const itemRoute = packageName === 'pages' ? '' : packageName;
	let scrollConfig = {
		// mutation: basicConfig.mutation,
		page: basicConfig.page,
		item: {
			path: upath.normalize(`${dir}${itemRoute}/components/${pathArr[0]}/${module}/item.wya`)
		},
		api: basicConfig.api,
		module: basicConfig.module,
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
						? tpl[key]({ mutation, humpMutation, route, packageName, pathArr, project, module, extra, title  })
						: content
				);
			} else if (typeof tpl[`${key}Override`] === 'function') {
				// 文件存在，重写相关
				log(chalk`{yellow ${key}}: {rgb(255,131,0) override}`);
				fs.outputFileSync(
					fullpath,
					tpl[`${key}Override`](
						fs.readFileSync(fullpath, 'utf-8'),
						{ mutation, humpMutation, route, packageName, pathArr, project, module, extra, title  }
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
						{ mutation, humpMutation, pathArr, project, packageName, module, extra, title, route  }
					)
				);
				
			}
		});

		if (template === 'scroll') {
			fs.removeSync(scrollConfig.page.path);

			Object.keys(scrollConfig).forEach(key => {
				let { path } = scrollConfig[key];
				let fullpath = join(path);
				if (typeof scrollTpl[key] === 'function') {
					log(chalk`{yellow ${key}}: {rgb(255,131,0) ${fs.existsSync(fullpath) ? 'override' : 'created'}}`);

					fs.outputFileSync(
						fullpath,
						scrollTpl[key](
							fs.existsSync(fullpath) ? fs.readFileSync(fullpath, 'utf-8') : '',
							{ mutation, humpMutation, pathArr, project, packageName, module, pagingMode, pagingType, extra, title, route, env }
						)
					);
					
				}
			});
		}
		if (template === 'form') {
			fs.removeSync(formConfig.page.path);

			Object.keys(formConfig).forEach(key => {
				let { path } = formConfig[key];
				let fullpath = join(path);
				console.log(formTpl, typeof formTpl[key] === 'function');
				if (typeof formTpl[key] === 'function') {
					log(chalk`{yellow ${key}}: {rgb(255,131,0) ${fs.existsSync(fullpath) ? 'override' : 'created'}}`);

					fs.outputFileSync(
						fullpath,
						formTpl[key](
							fs.existsSync(fullpath) ? fs.readFileSync(fullpath, 'utf-8') : '',
							{ mutation, humpMutation, pathArr, packageName, project, module, extra, title, env  }
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
