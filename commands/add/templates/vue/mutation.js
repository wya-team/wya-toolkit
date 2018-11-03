'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var mutation = exports.mutation = function mutation() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var pathArr = opts.pathArr,
	    obj = opts.obj;

	var mutationType = pathArr.join('_').toUpperCase() + '_GET';
	var contents = '';
	contents += '/**\n';
	contents += ' * \u8BF7\u6CE8\u91CA\u6A21\u5757\u5185\u5BB9\n';
	contents += ' */\n';
	contents += 'export const ' + mutationType + ' = \'' + mutationType + '\';\n';
	return contents;
};

var mutationOverride = exports.mutationOverride = function mutationOverride(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var pathArr = opts.pathArr,
	    obj = opts.obj;

	var mutationType = pathArr.join('_').toUpperCase() + '_GET';
	var newContent = '';
	newContent += 'export const ' + mutationType + ' = \'' + mutationType + '\';';

	if (content.includes(newContent) === false) {
		content += newContent + '\n';
	}

	return content;
};