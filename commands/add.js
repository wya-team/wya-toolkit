'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _inquirer = require('inquirer');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _index = require('./add/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = console.log;
var question = [{
	type: 'list',
	name: 'type',
	message: 'Select type:',
	choices: [new _inquirer.Separator(' = For project = '), 'routeforReact', 'routeforWechat', 'routeforRN'],
	default: 'routeforReact'
}, {
	type: 'input',
	name: 'path',
	message: 'RoutePath is required:',
	default: '/home',
	when: function when(answers) {
		return answers.type === 'routeforReact';
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
		return answers.type === 'routeforReact';
	},
	default: process.cwd() + '/src/pages/'
	// default: `${process.cwd()}/tmp/`
}];

var stream = (0, _inquirer.prompt)(question).then(function (_ref) {
	var type = _ref.type,
	    path = _ref.path,
	    dir = _ref.dir;

	// 目前只有一个route
	switch (type) {
		case "routeforReact":
			(0, _index.routeforReact)(path, dir);
			break;
		default:
			log('need to do!');
			break;
	}
});

exports.default = stream;