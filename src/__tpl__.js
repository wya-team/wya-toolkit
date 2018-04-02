'use strict';
const { prompt } = require('inquirer');
const question = [
	{
		type: 'input',
		name: 'name',
		message: 'Name is required:',
		validate (val) {
			if (val === '') {
				return 'Name is required!';
			} else {
				return true;
			}
		}
	},
	{
		type: 'input',
		name: 'test',
		message: 'Test is not required:',
		default: 'master'
	}
];

module.exports = prompt(question).then(({ name, place }) => {
	
});