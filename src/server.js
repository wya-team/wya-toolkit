import { prompt } from 'inquirer';
import fs from 'fs-extra';
import chalk from 'chalk';

import connect from 'connect';
import http from 'http';
import https from 'https';
import serveStatic from 'serve-static';
import serveIndex from 'serve-index';
import history from 'connect-history-api-fallback';
import { resolve, join } from 'path';

import { localIp, openURL } from './utils';


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
	},

];

const stream = prompt(question)
	.then((opts = {}) => {
		s;
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

		// create https server
		let options = {
			key: fs.readFileSync(resolve(__dirname, '../keys', 'key.pem')),
			cert: fs.readFileSync(resolve(__dirname, '../keys', 'cert.pem'))
		};

		https.createServer(options, app).listen(secure, function () {
			let url = `https://${hostname}${secure != 80 ? `:${secure}` : ''}/`;
			log(`${chalk.rgb(255, 255, 255)('Also Running at')} ${chalk.hex("#deaded")(url)}`);
		});
	})
	.catch(e => {
		log(chalk`{red ${e}}`);
	});

export default stream;