'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var action = exports.action = function action() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var name = opts.name,
	    action = opts.action,
	    pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;

	var actionType = componentArr.join('_').toUpperCase() + '_GET';
	var contents = '';
	contents += '/**\n';
	contents += ' * \u8BF7\u6CE8\u91CA\u6A21\u5757\u5185\u5BB9\n';
	contents += ' */\n';
	contents += 'export const ' + actionType + ' = \'' + actionType + '\';\n';
	return contents;
};