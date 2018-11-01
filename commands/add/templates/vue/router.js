'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var router = exports.router = function router() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var name = opts.name,
	    mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj;

	var contents = '';

	contents += 'export const ' + mutation + 'Config = [\n';
	contents += '\t{\n';
	contents += '\t\tpath: \'/' + mutation + '\',\n';
	contents += '\t\tredirect: \'/' + mutation + '/main\'\n';
	contents += '\t},\n';

	contents += '\t{\n';
	contents += '\t\tpath: \'' + pathArr.join('/') + '\',\n';
	contents += '\t\tname: \'' + pathArr.join('-') + '\',\n';
	contents += '\t\tcomponent: () => import(\'./modules/' + pathArr.join('-') + '.vue\')\n';
	contents += '\t}';
	contents += '\n];\n';
	return contents;
};

var routerOverride = exports.routerOverride = function routerOverride(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var name = opts.name,
	    mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj;

	try {
		if (content.substr(-1) !== '\n') {
			content += '\n';
		}
		// 需要注入的参数
		var newContent = '';
		newContent += '\t{\n';
		newContent += '\t\tpath: \'' + pathArr.join('/') + '\',\n';
		newContent += '\t\tname: \'' + pathArr.join('-') + '\',\n';
		newContent += '\t\tcomponent: () => import(\'./modules/' + pathArr.join('-') + '.vue\')\n';
		newContent += '\t}';

		var txtSplit = '\n];\n';

		var splitContent = content.split(txtSplit);

		if (splitContent[0] && splitContent[0].includes(newContent) === false) {
			var tag = '';
			if (splitContent[0].substr(-1) === ',') {
				tag = '\n';
			} else if (splitContent[0].substr(-2) === ',\n') {
				tag = '';
			} else {
				tag = ",\n";
			}
			splitContent[0] += '' + tag + newContent;
		}

		return splitContent.slice(1).reduce(function (pre, cur) {
			return pre + txtSplit + cur;
		}, splitContent[0]);
	} catch (e) {
		return content;
	}
};