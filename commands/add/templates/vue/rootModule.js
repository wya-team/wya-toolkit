'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.rootModuleOverride = exports.rootModule = undefined;

var _helper = require('./utils/helper');

var rootModule = exports.rootModule = function rootModule() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;


	var extra = pathArr.slice(1).map(function (item) {
		return '' + item[0].toUpperCase() + item.slice(1);
	}).join('');
	var pathName = '' + pathArr.slice(1).join('-');
	var moduleName = '' + mutation + extra;

	var contents = '';
	contents += 'import { ' + moduleName + ' } from \'./' + pathName + '\';\n';
	contents += '\nexport default {\n';
	contents += '\t' + moduleName;
	contents += '\n};\n';
	return contents;
};

var rootModuleOverride = exports.rootModuleOverride = function rootModuleOverride(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;

	try {
		var extra = pathArr.slice(1).map(function (item) {
			return '' + item[0].toUpperCase() + item.slice(1);
		}).join('');
		var pathName = '' + pathArr.slice(1).join('-');
		var moduleName = '' + mutation + extra;

		var importContent = 'import { ' + moduleName + ' } from \'./' + pathName + '\';';
		var injectContent = '\t' + moduleName;

		var importSplit = '\nexport default {\n';
		var injectSplit = '\n};\n';

		return (0, _helper.getNewContent)({
			content: content,
			importContent: importContent,
			injectContent: injectContent,
			importSplit: importSplit,
			injectSplit: injectSplit
		});
	} catch (e) {
		return content;
	}
};