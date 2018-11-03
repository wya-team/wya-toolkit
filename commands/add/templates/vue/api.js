'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.apiOverride = exports.api = undefined;

var _helper = require('./utils/helper');

var api = exports.api = function api() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj;


	var contents = '';
	contents += 'const api = {\n';
	contents += '\t/**\n';
	contents += '\t * \u8BF7\u6CE8\u91CA\u6A21\u5757\u5185\u5BB9\n';
	contents += '\t */\n';
	contents += '\t' + pathArr.join('_').toUpperCase() + '_GET: \'\'';
	contents += '\n};\n';
	contents += 'export default api;\n';
	return contents;
};

var apiOverride = exports.apiOverride = function apiOverride(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj;


	try {
		var importContent = undefined;
		var injectContent = '\t' + pathArr.join('_').toUpperCase() + '_GET: \'\'';

		var importSplit = undefined;
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