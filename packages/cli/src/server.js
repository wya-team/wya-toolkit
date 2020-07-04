const { prompt } = require('inquirer');
const fs = require('fs-extra');
const chalk = require('chalk');

const connect = require('connect');
const http = require('http');
const https = require('https');
const serveStatic = require('serve-static');
const serveIndex = require('serve-index');
const history = require('connect-history-api-fallback');
const { resolve, join } = require('path');
const pem = require('pem');
const { promisify } = require('util');

const createCertificate = promisify(pem.createCertificate);
const { readFileSync } = fs;

const { localIp, openURL } = require('./utils');

const log = console.log;
const question = [
	{
		type: 'input',
		name: 'port',
		message: 'port:',
		default: '8082'
	},
	{
		type: 'input',
		name: 'hostname',
		message: 'hostname:',
		default: localIp
	},
	{
		type: 'input',
		name: 'dir',
		message: 'dir:',
		default: process.cwd()
	},
	{
		type: 'confirm',
		name: 'open',
		message: 'open browser:',
		default: false
	},
	{
		type: 'confirm',
		name: 'fallback',
		message: 'enable html5 history mode:',
		default: false
	}

];

const stream = prompt(question)
	.then((opts = {}) => {
		// options
		let { port, hostname, open, dir, fallback } = opts;
		port = Number(port);
		let secure = port + 1;

		// create app
		let app = connect();
		// log request 
		app.use((req, res, next) => {
			res.setHeader("Access-Control-Allow-Origin", "*");
			log(chalk`{green ${req.method}}: {rgb(255,131,0) ${req.url}}`);
			next();
		});
		// html5 history
		if (fallback) {
			app.use(history({
				index: '/index.html'
			}));
		}

		// 获取文件资源
		app.use(serveIndex(dir, { 'icons': true }));
		// 当静态文件打开
		app.use(serveStatic(dir, { 'index': ['index.html'] }));

		// create http server
		http.createServer(app).listen(port, function () {

			let url = `http://${hostname}${port != 80 ? `:${port}` : ''}/`;
			log(`${chalk.rgb(255, 255, 255)('Running at')} ${chalk.hex("#deaded")(url)}`);

			open && openURL(url);
		});

		/**
		 * 当Safari打开时，继续访问，将签名标记为信任
		 * 当Chrome打开时，直接键盘敲入这12个字符：`thisisunsafe` 
		 * 注意：鼠标点击当前页面任意位置，让页面处于最上层即可输入
		 */
		createCertificate({ days: 1, selfSigned: true }).then((options) => {
			const { serviceKey: key, certificate: cert } = options;

			https.createServer({ key, cert }, app).listen(secure, function () {
				let url = `https://${hostname}${secure != 80 ? `:${secure}` : ''}/`;
				log(`${chalk.rgb(255, 255, 255)('Also Running at')} ${chalk.hex("#deaded")(url)}`);
			});

		});
	})
	.catch(e => {
		log(chalk`{red ${e}}`);
	});

module.exports = stream;