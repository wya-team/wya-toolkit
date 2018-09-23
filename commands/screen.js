'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['{red ', '}'], ['{red ', '}']);

var _inquirer = require('inquirer');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _screenshotDesktop = require('screenshot-desktop');

var _screenshotDesktop2 = _interopRequireDefault(_screenshotDesktop);

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var log = console.log;
var question = [{
	type: 'input',
	name: 'port',
	message: 'port:',
	default: '8082'
}, {
	type: 'input',
	name: 'hostname',
	message: 'hostname:',
	default: _utils.localIp
}, _defineProperty({
	type: 'input',
	name: 'delay',
	message: 'Screen refresh delay(s):',
	default: _utils.localIp
}, 'default', 2)];

var stream = (0, _inquirer.prompt)(question).then(function () {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	// options
	var port = opts.port,
	    hostname = opts.hostname,
	    delay = opts.delay;


	var server = _http2.default.createServer(function (req, res) {
		var pathname = (0, _path.resolve)(process.cwd(), './commands/screen/index.html');
		_fs2.default.exists(pathname, function (exists) {

			res.writeHead(200, { "Content-Type": "text/html" });
			_fs2.default.readFile(pathname, function (err, data) {
				res.end(data);
			});
		});
	});

	server.listen(port, hostname, function () {
		console.log('Server running at http://' + hostname + ':' + port + '/');
	});

	var wss = new _ws2.default.Server({
		port: +port + 1,
		host: hostname
	}, function () {
		console.log('Wss Server: ws://' + hostname + ':' + (+port + 1));
	});

	// socket集合，会有多个客服端接入
	var socketArr = [];
	var timer = null;

	wss.on('connection', function (socket, request) {
		var timer = null;
		socketArr.push(socket);
		// 服务端订阅
		socket.on('message', function (res) {
			var obj = {};
			try {
				obj = JSON.parse(res);
			} catch (e) {
				obj = {};
			}
			var _obj = obj,
			    event = _obj.event,
			    data = _obj.data;

			switch (event) {
				case 'server-event-sub':
				// 发布 -> 客服端
				// 每个都发送
				default:
					return;
			}
		});
		socket.on('close', function () {
			socketArr = socketArr.filter(function (item) {
				return item != socket;
			});
		});
	});

	// 发送图片
	setInterval(function () {
		(0, _screenshotDesktop2.default)().then(function (img) {
			var startTime = Date.now();
			socketArr.forEach(function (it, index) {
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
		}).catch(function (err) {
			// console.log(err);
		});
	}, delay < 1 ? 1000 : delay * 1000); // 和录制屏幕的原理不一样，截图设置为0延迟，电脑都会卡死
}).catch(function (e) {
	log((0, _chalk2.default)(_templateObject, e));
});

exports.default = stream;