'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['{green ', '}: {rgb(255,131,0) ', '}'], ['{green ', '}: {rgb(255,131,0) ', '}']),
    _templateObject2 = _taggedTemplateLiteral(['{red ', '}'], ['{red ', '}']);

var _inquirer = require('inquirer');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _connect = require('connect');

var _connect2 = _interopRequireDefault(_connect);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _serveStatic = require('serve-static');

var _serveStatic2 = _interopRequireDefault(_serveStatic);

var _serveIndex = require('serve-index');

var _serveIndex2 = _interopRequireDefault(_serveIndex);

var _connectHistoryApiFallback = require('connect-history-api-fallback');

var _connectHistoryApiFallback2 = _interopRequireDefault(_connectHistoryApiFallback);

var _path = require('path');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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
}, {
	type: 'input',
	name: 'dir',
	message: 'dir:',
	default: process.cwd()
}, {
	type: 'confirm',
	name: 'open',
	message: 'open browser:',
	default: false
}, {
	type: 'confirm',
	name: 'fallback',
	message: 'enable html5 history mode:',
	default: false
}];

var stream = (0, _inquirer.prompt)(question).then(function () {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	// options
	var port = opts.port,
	    hostname = opts.hostname,
	    open = opts.open,
	    dir = opts.dir,
	    fallback = opts.fallback;

	port = Number(port);
	var secure = port + 1;

	// create app
	var app = (0, _connect2.default)();
	// log request 
	app.use(function (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		log((0, _chalk2.default)(_templateObject, req.method, req.url));
		next();
	});
	// html5 history
	if (fallback) {
		app.use((0, _connectHistoryApiFallback2.default)({
			index: '/index.html'
		}));
	}

	// 获取文件资源
	app.use((0, _serveIndex2.default)(dir, { 'icons': true }));
	// 当静态文件打开
	app.use((0, _serveStatic2.default)(dir, { 'index': ['index.html'] }));

	// create http server
	_http2.default.createServer(app).listen(port, function () {

		var url = 'http://' + hostname + (port != 80 ? ':' + port : '') + '/';
		log(_chalk2.default.rgb(255, 255, 255)('Running at') + ' ' + _chalk2.default.hex("#deaded")(url));

		open && (0, _utils.openURL)(url);
	});

	// create https server
	var options = {
		key: (0, _fsExtra.readFileSync)((0, _path.resolve)(__dirname, '../keys', 'key.pem')),
		cert: (0, _fsExtra.readFileSync)((0, _path.resolve)(__dirname, '../keys', 'cert.pem'))
	};

	_https2.default.createServer(options, app).listen(secure, function () {
		var url = 'https://' + hostname + (secure != 80 ? ':' + secure : '') + '/';
		log(_chalk2.default.rgb(255, 255, 255)('Also Running at') + ' ' + _chalk2.default.hex("#deaded")(url));
	});
}).catch(function (e) {
	log((0, _chalk2.default)(_templateObject2, e));
});

exports.default = stream;