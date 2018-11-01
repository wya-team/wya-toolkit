'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _inquirer = require('inquirer');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

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
	default: 'tpl',
	validate: function validate(val) {
		if (val === '') {
			return 'Project Name is required!';
		} else {
			return true;
		}
	}
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
	default: process.cwd() + '/src/pages/',
	// default: `${process.cwd()}/tmp/`,
	validate: function validate(val) {
		if (val === process.cwd() + '/tmp/') {
			_shelljs2.default.rm('-rf', 'tmp');
		}
		return true;
	}
}];

var stream = (0, _inquirer.prompt)(question).then(function (_ref) {
	var type = _ref.type,
	    path = _ref.path,
	    dir = _ref.dir,
	    project = _ref.project;

	switch (type) {
		case "routeForReact":
			(0, _index.routeForReact)(path, dir);
			break;
		case "routeForVue":
			(0, _index.routeForVue)(path, dir, project);
			break;
		default:
			log('need to do!');
			break;
	}
});

exports.default = stream;