'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.api = undefined;

var _helper = require('../utils/helper');

var api = exports.api = function api(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj;


	try {
		if (pathArr.includes('list') === false) {
			var importContent = undefined;
			var injectContent = '\t' + pathArr.join('_').toUpperCase() + '_LIST_GET: \'/orders/orders/list.json\'';

			var importSplit = undefined;
			var injectSplit = '\n};\n';

			return (0, _helper.getNewContent)({
				content: content,
				importContent: importContent,
				injectContent: injectContent,
				importSplit: importSplit,
				injectSplit: injectSplit
			});
		} else {
			return content;
		}
	} catch (e) {
		console.log(e);
		return content;
	}
};