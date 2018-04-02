'use strict';

var _require = require('inquirer'),
    prompt = _require.prompt;

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

module.exports = prompt(question).then(function (_ref) {
	var name = _ref.name,
	    place = _ref.place;
});