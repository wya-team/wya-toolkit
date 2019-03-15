'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.routerOverride = exports.router = undefined;

var _helper = require('./utils/helper');

var router = exports.router = function router() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj,
	    title = opts.title,
	    extra = opts.extra;

	var contents = '';

	contents += 'export const ' + mutation + 'Config = [\n';
	contents += '\t{\n';
	contents += '\t\tpath: \'/' + mutation + '\',\n';
	contents += '\t\tredirect: \'/' + mutation + '/main\'\n';
	contents += '\t},\n';

	contents += '\t{\n';
	contents += '\t\tpath: \'/' + pathArr.join('/') + (extra || '') + '\',\n';
	contents += '\t\tname: \'' + pathArr.join('-') + '\',\n';
	contents += '\t\tmeta: { title: \'' + title + '\' },\n';
	contents += '\t\tcomponent: () => import(\'./modules/' + pathArr.join('-') + '.vue\')\n';
	contents += '\t}';
	contents += '\n];\n';
	return contents;
};

var routerOverride = exports.routerOverride = function routerOverride(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj,
	    title = opts.title,
	    extra = opts.extra;

	try {
		var importContent = undefined;
		var injectContent = '';
		injectContent += '\t{\n';
		injectContent += '\t\tpath: \'/' + pathArr.join('/') + '\',\n';
		injectContent += '\t\tname: \'' + pathArr.join('-') + '\',\n';
		injectContent += '\t\tmeta: { title: \'' + title + '\' },\n';
		injectContent += '\t\tcomponent: () => import(\'./modules/' + pathArr.join('-') + '.vue\')\n';
		injectContent += '\t}';

		var importSplit = undefined;
		var injectSplit = '\n];\n';

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