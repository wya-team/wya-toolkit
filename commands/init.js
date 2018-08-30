'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['{red ', '}'], ['{red ', '}']);

var _inquirer = require('inquirer');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var log = console.log;
var question = [{
	type: 'input',
	name: 'project',
	message: 'Project name:',
	validate: function validate(val) {
		if (val !== '') {
			return true;
		}
		return 'Project name is required!';
	}
}, {
	type: 'input',
	name: 'place',
	message: 'Where to init the project:',
	default: './'
}, {
	type: 'list',
	name: 'repository',
	message: 'Select repository:',
	choices: [new _inquirer.Separator(' = For js project = '), 'wya-team/vue-env#master', 'wya-team/react-env#master', 'wya-team/rn-env#master', 'wya-team/wechat-env#master', 'wya-team/wya-webpack#master', 'wya-team/wya-rollup#master', new _inquirer.Separator(' = For native project = '), 'wya-team/android-env#master', 'wya-team/android-template#master', 'wya-team/WYAiOSEnv#master', 'wya-team/WYAiOSTemplate#master', 'wya-team/WYASwiftEnv#master', 'wya-team/WYASwiftTemplate#master', 'none'],
	default: 'none'
}, {
	type: 'input',
	name: 'repository',
	message: 'Input repository',
	when: function when(answers) {
		return answers.repository === 'none';
	},
	validate: function validate(val) {
		if (val.includes("#") && val.includes("/")) {
			return true;
		}
		return 'Input repository is required and has branch(**/**#master)';
	}
}];

var stream = (0, _inquirer.prompt)(question).then(function () {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	// options
	var project = opts.project,
	    repository = opts.repository,
	    place = opts.place;

	var spinner = (0, _ora2.default)('Downloading repository...');

	spinner.start();

	(0, _downloadGitRepo2.default)('' + repository, place + '/' + project, function (err) {
		if (err) {
			log(_chalk2.default.red(err));
			process.exit();
		}
		spinner.stop();
		log(_chalk2.default.green('New project has been initialized successfully!'));
	});
}).catch(function (e) {
	log((0, _chalk2.default)(_templateObject, e));
});

exports.default = stream;