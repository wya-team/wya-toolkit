'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.rootRoute = undefined;

var _helper = require('../utils/helper');

var rootRoute = exports.rootRoute = function rootRoute(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;

	try {
		var importContent = 'import { ' + mutation + 'Config } from \'../containers/' + mutation + '/app\';';
		var injectContent = '\t\t\t\t...' + mutation + 'Config';

		var importSplit = '\nexport const routeConfig = {\n';
		var injectSplit = '\n\t\t\t]\n\t\t},\n';

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