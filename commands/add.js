'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _inquirer = require('inquirer');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _upath = require('upath');

var _upath2 = _interopRequireDefault(_upath);

var _index = require('./add/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	// default: upath.normalize(`${process.cwd()}/src/pages/`),
	// default: upath.normalize(`${process.cwd()}/tmp/`),
	default: _upath2.default.normalize(process.cwd() + '/tmp/src/pages/'),
	validate: function validate(val) {
		if (val === process.cwd() + '/tmp/') {
			// shell.rm('-rf', 'tmp');
		}
		return true;
	}
}];

var stream = (0, _inquirer.prompt)(question).then(function (res) {
	switch (res.type) {
		case "routeForReact":
			(0, _index.routeForReact)(res);
			break;
		case "routeForVue":
			(0, _index.routeForVue)(res);
			break;
		default:
			log('need to do!');
			break;
	}
});

exports.default = stream;