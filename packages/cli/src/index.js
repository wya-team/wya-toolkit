const chalk = require('chalk');
const program = require('commander');
const { resolve } = require('path');

process.env.NODE_PATH = resolve(__dirname, '../node_modules/');

const res = command => resolve(__dirname, './', command);
const log = console.log;

program
	.version(require('../package').version);

// 使用指令参数 如 wya server;
program
	.usage('<cmd>');

// 局域网共享屏幕 终端执行：wya screen
program
	.command('screen')
	.alias('sc')
	.description('Run static file screen anywhere')
	.action((opts) => require(res('screen')));

// 服务 终端执行：wya server
program
	.command('server')
	.alias('s')
	.description('Run static file server anywhere')
	.action((opts) => require(res('server')));

// 初始化项目 终端执行：wya init
program
	.command('init')
	.alias('i')
	.description('Create a new project')
	.action((opts) => require(res('init')));

// 辅助项目检查
program
	.command('lint')
	.alias('l')
	.description('Check the rules')
	.option('-m, --mode <mode>', 'select rule mode')
	.action((opts) => {
		log(chalk`{yellow ${opts.mode ? opts.mode : 'commit'}} rule`);
		try {
			let fn = require(res('lint'));
			typeof fn === 'function' ? fn(opts) : fn.default(opts);
		} catch (e) {
			log(chalk`{red ${e}}`);
		}
	});

// 任意匹配
program
	.command('*')
	.action((cmd) => log(chalk`{red Invalid mode ${cmd}}`));

program.parse(process.argv);

if (!program.args.length) {
	program.help();
}
