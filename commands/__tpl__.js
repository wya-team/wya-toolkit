'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _inquirer = require('inquirer');

var question = [{
	type: 'input',
	name: 'name',
	message: 'Name is required:',
	validate: function validate(val) {
		if (val === '') {
			return 'Name is required!';
		} else {
			return true;
		}
	}
}, {
	type: 'input',
	name: 'test',
	message: 'Test is not required:',
	default: 'master'
}];

var stream = function stream(cmd, opts) {
	return (0, _inquirer.prompt)(question).then(function (_ref) {
		var name = _ref.name,
		    place = _ref.place;
	});
};

exports.default = stream;