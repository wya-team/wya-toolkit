import { prompt } from 'inquirer';
import chalk from 'chalk';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { resolve } from 'path';
import screenshot from 'screenshot-desktop';
import WebSocket from 'ws';

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
		name: 'delay',
		message: 'Screen refresh delay(s):',
		default: localIp,
		default: 2
	}

];

const stream = prompt(question)
	.then((opts = {}) => {
		// options
		let { port, hostname, delay } = opts;

		const server = http.createServer((req, res) => {
			let pathname = resolve(__dirname, './screen/index.html');
			fs.exists(pathname, (exists) => {

				res.writeHead(200, { "Content-Type": "text/html" });
				fs.readFile(pathname, (err, data) => {
					res.end(data);
				});
			});
		});

		server.listen(port, hostname, () => {
			console.log(`Server running at http://${hostname}:${port}/`);
		});

		const wss = new WebSocket.Server({
			port: +port + 1,
			host: hostname
		}, () => {
			console.log(`Wss Server: ws://${hostname}:${+port + 1}`);
		});

		// socket集合，会有多个客服端接入
		let socketArr = [];
		let timer = null;

		wss.on('connection', (socket, request) => {
			let timer = null;
			socketArr.push(socket);
			// 服务端订阅
			socket.on('message', (res) => {
				let obj = {};
				try {
					obj = JSON.parse(res);
				} catch (e) {
					obj = {};
				}
				const { event, data } = obj;
				switch (event) {
					case 'server-event-sub':
						// 发布 -> 客服端
						// 每个都发送
					default :
						return;
				}
			});
			socket.on('close', () => {
				socketArr = socketArr.filter(item => item != socket);
			});
		});


		// 发送图片
		setInterval(() => {	
			screenshot().then((img) => {
				let startTime = Date.now();
				socketArr.forEach((it, index) => {
					// 发布 -> 客服端
					if (it.readyState != 3) {
						it.send(JSON.stringify({
							event: 'getImage',
							data: img
						}));
					} else {
						it.close();
					}
				});
			}).catch((err) => {
				// console.log(err);
			});
		}, delay < 1 ? 1000 : delay * 1000); // 和录制屏幕的原理不一样，截图设置为0延迟，电脑都会卡死
	})
	.catch(e => {
		log(chalk`{red ${e}}`);
	});

export default stream;