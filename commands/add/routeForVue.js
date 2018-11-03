'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.routeForVue = undefined;

var _templateObject = _taggedTemplateLiteral(['{green ', '}: {rgb(255,131,0) ', '}'], ['{green ', '}: {rgb(255,131,0) ', '}']),
    _templateObject2 = _taggedTemplateLiteral(['{green ', '}: {rgb(255,131,0) created}'], ['{green ', '}: {rgb(255,131,0) created}']),
    _templateObject3 = _taggedTemplateLiteral(['{yellow ', '}: {rgb(255,131,0) override}'], ['{yellow ', '}: {rgb(255,131,0) override}']),
    _templateObject4 = _taggedTemplateLiteral(['{yellow ', '}: {rgb(255,131,0) ', '}'], ['{yellow ', '}: {rgb(255,131,0) ', '}']),
    _templateObject5 = _taggedTemplateLiteral(['{red ', '}'], ['{red ', '}']);

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

var _index2 = require('./templates/vue/root/index');

var rootTpl = _interopRequireWildcard(_index2);

var _index3 = require('./templates/vue/paging/index');

var pagingTpl = _interopRequireWildcard(_index3);

var _index4 = require('./templates/vue/form/index');

var formTpl = _interopRequireWildcard(_index4);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var log = console.log;
var routeForVue = exports.routeForVue = function routeForVue(_ref) {
	var path = _ref.path,
	    dir = _ref.dir,
	    project = _ref.project,
	    template = _ref.template,
	    pagingMode = _ref.pagingMode,
	    pagingType = _ref.pagingType;

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

	var basicConfig = {
		router: {
			path: _upath2.default.normalize(dir + 'containers/' + pathArr[0] + '/app.js')
		},
		container: {
			path: _upath2.default.normalize(dir + 'containers/' + pathArr[0] + '/modules/' + container + '.vue')
		},
		component: {
			path: _upath2.default.normalize(dir + 'components/' + pathArr[0] + '/' + module + '/__tpl__.vue')
		},
		/**
   * strore
   */
		mutation: {
			path: _upath2.default.normalize(dir + 'stores/mutations/' + mutation + '.js')
		},
		api: {
			path: _upath2.default.normalize(dir + 'stores/apis/' + mutation + '.js')
		},
		module: {
			path: _upath2.default.normalize(dir + 'stores/modules/' + mutation + '/' + module + '.js')
		},
		rootModule: {
			path: _upath2.default.normalize(dir + 'stores/modules/' + mutation + '/root.js')
		}
	};

	var rootConfig = {
		rootApi: {
			path: _upath2.default.normalize(dir + 'stores/apis/root.js')
		},
		rootRoute: {
			path: _upath2.default.normalize(dir + 'routers/routes.js')
		},
		rootModules: {
			path: _upath2.default.normalize(dir + 'stores/modules/root.js')
		}
	};

	var pagingConfig = {
		mutation: basicConfig.mutation,
		api: basicConfig.api,
		module: basicConfig.module,
		container: basicConfig.container,
		filter: {
			path: _upath2.default.normalize(dir + 'components/' + pathArr[0] + '/' + module + '/filter.vue')
		},
		item: {
			path: _upath2.default.normalize(dir + 'components/' + pathArr[0] + '/' + module + '/item.' + (pagingMode === 'table' ? 'js' : 'vue'))
		},
		list: {
			path: _upath2.default.normalize(dir + 'components/' + pathArr[0] + '/' + module + '/' + (pagingType === 'tabs' ? 'tabs-' : '') + 'list.vue')
		}
	};

	var formConfig = {
		container: basicConfig.container,
		component: {
			path: _upath2.default.normalize(dir + 'components/' + pathArr[0] + '/' + module + '/content.vue')
		}
	};

	// log
	Object.keys(basicConfig).forEach(function (key) {
		return log((0, _chalk2.default)(_templateObject, key, basicConfig[key].path));
	});

	var question = {
		type: 'confirm',
		name: 'sure',
		message: 'Please make sure ~',
		default: false
	};
	return (0, _inquirer.prompt)(question).then(function (res) {
		if (!res.sure) return null;
		log((0, _chalk2.default)('waiting...'));
		Object.keys(basicConfig).forEach(function (key) {
			var path = basicConfig[key].path;

			var fullpath = (0, _path.join)(path);

			var content = '';
			content += '/**\n';
			content += ' * \u8BF7\u6CE8\u91CA\u76F8\u5173\u4FE1\u606F\n';
			content += ' */';
			if (!_fsExtra2.default.existsSync(fullpath)) {
				// 文件不存在的情况下操作
				log((0, _chalk2.default)(_templateObject2, key));
				_fsExtra2.default.outputFileSync(fullpath, typeof tpl[key] === 'function' ? tpl[key]({ mutation: mutation, pathArr: pathArr, project: project, module: module }) : content);
			} else if (typeof tpl[key + 'Override'] === 'function') {
				// 文件存在，重写相关
				log((0, _chalk2.default)(_templateObject3, key));
				_fsExtra2.default.outputFileSync(fullpath, tpl[key + 'Override'](_fsExtra2.default.readFileSync(fullpath, 'utf-8'), { mutation: mutation, pathArr: pathArr, project: project, module: module }));
			}
		});

		Object.keys(rootConfig).forEach(function (key) {
			var path = rootConfig[key].path;

			var fullpath = (0, _path.join)(path);
			if (_fsExtra2.default.existsSync(fullpath) && typeof rootTpl[key] === 'function') {
				// 文件存在，重写相关
				log((0, _chalk2.default)(_templateObject3, key));

				_fsExtra2.default.outputFileSync(fullpath, rootTpl[key](_fsExtra2.default.readFileSync(fullpath, 'utf-8'), { mutation: mutation, pathArr: pathArr, project: project, module: module }));
			}
		});
		if (template === 'paging') {
			_fsExtra2.default.removeSync(basicConfig.component.path);

			Object.keys(pagingConfig).forEach(function (key) {
				var path = pagingConfig[key].path;

				var fullpath = (0, _path.join)(path);
				if (typeof pagingTpl[key] === 'function') {
					log((0, _chalk2.default)(_templateObject4, key, _fsExtra2.default.existsSync(fullpath) ? 'override' : 'created'));

					_fsExtra2.default.outputFileSync(fullpath, pagingTpl[key](_fsExtra2.default.existsSync(fullpath) ? _fsExtra2.default.readFileSync(fullpath, 'utf-8') : '', { mutation: mutation, pathArr: pathArr, project: project, module: module, pagingMode: pagingMode, pagingType: pagingType }));
				}
			});
		}

		if (template === 'form') {
			_fsExtra2.default.removeSync(basicConfig.component.path);

			Object.keys(formConfig).forEach(function (key) {
				var path = formConfig[key].path;

				var fullpath = (0, _path.join)(path);
				if (typeof formTpl[key] === 'function') {
					log((0, _chalk2.default)(_templateObject4, key, _fsExtra2.default.existsSync(fullpath) ? 'override' : 'created'));

					_fsExtra2.default.outputFileSync(fullpath, formTpl[key](_fsExtra2.default.existsSync(fullpath) ? _fsExtra2.default.readFileSync(fullpath, 'utf-8') : '', { mutation: mutation, pathArr: pathArr, project: project, module: module }));
				}
			});
		}
	}).catch(function (e) {
		log((0, _chalk2.default)(_templateObject5, e));
	});
};