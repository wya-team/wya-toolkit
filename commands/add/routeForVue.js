'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.routeForVue = undefined;

var _templateObject = _taggedTemplateLiteral(['{green ', '}: {rgb(255,131,0) ', '}'], ['{green ', '}: {rgb(255,131,0) ', '}']),
    _templateObject2 = _taggedTemplateLiteral(['{red ', '}'], ['{red ', '}']);

var _inquirer = require('inquirer');

var _upath = require('upath');

var _upath2 = _interopRequireDefault(_upath);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _index = require('./templates/vue/index');

var tpl = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var log = console.log;
var routeForVue = exports.routeForVue = function routeForVue(path, dir, project) {
	var pathArr = path.replace(/\({0,}\//g, '-').replace(/([a-z\dA-Z])([A-Z])/g, '$1-$2').toLowerCase().split('-').filter(function (item) {
		return item && !item.includes(':');
	});

	// 0
	if (pathArr.length === 0) return;
	// 1
	if (pathArr.length === 1) pathArr[1] = 'main';

	/**
  * container mutation reducer component
  */
	var container = pathArr.join('-');
	var mutation = pathArr[0];
	var module = pathArr.slice(1).join('-');
	var component = '__tpl__';
	var obj = {
		router: {
			name: container,
			path: _upath2.default.normalize(dir + 'containers/' + pathArr[0] + '/app.js')
		},
		container: {
			name: container,
			path: _upath2.default.normalize(dir + 'containers/' + pathArr[0] + '/modules/' + container + '.vue')
		},
		component: {
			name: component,
			path: _upath2.default.normalize(dir + 'components/' + pathArr[0] + '/' + module + '/' + component + '.vue')
		},
		/**
   * strore
   */
		mutation: {
			name: mutation,
			path: _upath2.default.normalize(dir + 'stores/mutations/' + mutation + '.js')
		},
		api: {
			name: mutation,
			path: _upath2.default.normalize(dir + 'stores/apis/' + mutation + '.js')
		},
		module: {
			name: module,
			path: _upath2.default.normalize(dir + 'stores/modules/' + mutation + '/' + module + '.js')
		},
		rootModule: {
			name: module,
			path: _upath2.default.normalize(dir + 'stores/modules/' + mutation + '/root.js')
		}
	};
	var names = Object.keys(obj);
	// log
	names.forEach(function (key) {
		return log((0, _chalk2.default)(_templateObject, key, obj[key].path));
	});

	var question = {
		type: 'confirm',
		name: 'sure',
		message: 'Please make sure ~',
		default: false
	};
	return (0, _inquirer.prompt)(question).then(function (res) {
		if (!res.sure) return null;
		(0, _chalk2.default)('waiting...');
		names.forEach(function (key) {
			var _obj$key = obj[key],
			    name = _obj$key.name,
			    path = _obj$key.path;

			var fullpath = (0, _path.join)(path);

			var contents = '';
			contents += '/**\n';
			contents += ' * ' + name + '\n';
			contents += ' */';
			// 文件不存在的情况下操作
			if (!_fsExtra2.default.existsSync(fullpath)) {
				_fsExtra2.default.outputFileSync(fullpath, typeof tpl[key] === 'function' ? tpl[key]({ name: name, mutation: mutation, pathArr: pathArr, project: project, module: module, obj: obj }) : contents);
			}
		});
	}).catch(function (e) {
		log((0, _chalk2.default)(_templateObject2, e));
	});
};