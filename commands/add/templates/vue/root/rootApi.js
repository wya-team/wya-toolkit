'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.rootApi = undefined;

var _helper = require('../utils/helper');

var rootApi = exports.rootApi = function rootApi(content) {
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

		var importContent = 'import ' + mutation + ' from \'./' + mutation + '\';';
		var injectContent = '\t...' + mutation;

		var importSplit = '\nconst API = {\n';
		var injectSplit = '\n};\n';

		return (0, _helper.getNewContent)({
			content: content,
			importContent: importContent,
			injectContent: injectContent,
			importSplit: importSplit,
			injectSplit: injectSplit
		});
	} catch (e) {
		console.log(e);
		return content;
	}
};