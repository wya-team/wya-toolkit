'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var api = exports.api = function api() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var name = opts.name,
	    mutation = opts.mutation,
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
		newContent += '\t' + pathArr.join('_').toUpperCase() + '_GET: \'\'';

		var txtSplit = '\n};\n';

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