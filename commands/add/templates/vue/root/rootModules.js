'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.rootModules = undefined;

var _helper = require('../utils/helper');

var rootModules = exports.rootModules = function rootModules(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;

	try {
		var importContent = 'import ' + mutation + ' from \'./' + mutation + '/root\';';
		var injectContent = '\t...' + mutation;

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