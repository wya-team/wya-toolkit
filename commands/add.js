'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _inquirer = require('inquirer');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _upath = require('upath');

var _upath2 = _interopRequireDefault(_upath);

var _path = require('path');

var _index = require('./add/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var log = console.log;
var question = [{
	type: 'list',
	name: 'type',
	message: 'Select type:',
	choices: [new _inquirer.Separator(' = For project = '), 'routeForVue', 'routeForReact',
	// 'routeForWechat',
	// 'routeForRN'
	'none'],
	default: 'routeForVue'
}, {
	type: 'input',
	name: 'project',
	message: 'Project Name:',
	when: function when(answers) {
		return answers.type === 'routeForVue';
	},
	validate: function validate(val) {
		if (val === '') {
			return 'Project Name is required!';
		} else {
			return true;
		}
	}
}, {
	type: 'list',
	name: 'template',
	message: 'Select template:',
	when: function when(answers) {
		return answers.type === 'routeForVue';
	},
	choices: [new _inquirer.Separator(' = For template = '), 'basic', 'paging', 'form'],
	default: 'basic'
}, {
	type: 'list',
	name: 'pagingType',
	message: 'Select type:',
	when: function when(answers) {
		return answers.template === 'paging';
	},
	choices: [new _inquirer.Separator(' = For template = '), 'basic', 'tabs'],
	default: 'basic'
}, {
	type: 'list',
	name: 'pagingMode',
	message: 'Select mode:',
	when: function when(answers) {
		return answers.template === 'paging';
	},
	choices: [new _inquirer.Separator(' = For template = '), 'table', 'piece', 'native'],
	default: 'table'
}, {
	type: 'input',
	name: 'path',
	message: 'RoutePath is required:',
	default: '/home',
	when: function when(answers) {
		return answers.type !== 'none';
	},
	validate: function validate(val) {
		if (val === '') {
			return 'Name is required!';
		} else {
			return true;
		}
	}
}, {
	type: 'input',
	name: 'dir',
	message: 'Where to in the project:',
	when: function when(answers) {
		return answers.type !== 'none';
	},
	default: _upath2.default.normalize(process.cwd() + '/src/pages/'),
	// default: upath.normalize(`${process.cwd()}/tmp/`),
	// default: upath.normalize(`${process.cwd()}/tmp/src/pages/`),
	validate: function validate(val) {
		if (val === process.cwd() + '/tmp/') {
			// shell.rm('-rf', 'tmp');
		}
		return true;
	}
}];

var fn = function fn(res, force) {
	try {
		switch (res.type) {
			case "routeForReact":
				(0, _index.routeForReact)(res);
				break;
			case "routeForVue":
				(0, _index.routeForVue)(res, force);
				// console.log(res);
				break;
			default:
				log('need to do!');
				break;
		}
	} catch (e) {
		console.log(e);
	}
};

var transform = function transform() {
	var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	var result = {
		template: ['form', 'basic', 'paging'].includes(arr[0]) ? arr[0] : undefined,
		pagingType: ['tabs', 'basic'].includes(arr[1]) ? arr[1] : undefined,
		pagingMode: ['native', 'piece', 'table'].includes(arr[2]) ? arr[2] : undefined
	};
	console.log(result, arr);
	return result;;
};

var loopMake = function loopMake(opts) {
	var config = require((0, _path.resolve)(process.cwd(), opts.config));

	var _ref = config.default || config,
	    routes = _ref.routes,
	    rest = _objectWithoutProperties(_ref, ['routes']);

	config.routes.forEach(function (item, index) {
		fn(_extends({}, rest, item, transform(item.template)), true);
	});
};
var stream = function stream(opts) {
	return opts.config ? loopMake(opts) : (0, _inquirer.prompt)(question).then(fn);
};

exports.default = stream;