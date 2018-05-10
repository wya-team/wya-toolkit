'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var creator = exports.creator = function creator(name, action) {
	var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	var pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;

	var contents = '';
	contents += 'import * as types from \'@constants/actions/' + action + '\';\n';
	contents += '/**\n';
	contents += ' * \u5F15\u5165\u5171\u7528\u7684action\n';
	contents += ' * navigator, request, emit \n';
	contents += ' */\n';
	contents += 'export { navigator } from \'./_common/navigator\';\n';
	contents += 'export { request } from \'./_common/request\';\n';
	contents += 'export { emit } from \'./_common/emit\';\n';
	return contents;
};