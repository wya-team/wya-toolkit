'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var api = exports.api = function api(name, action) {
	var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	var pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;

	var contents = '';
	contents += 'const api = {\n';
	contents += '\t/**\n';
	contents += '\t * \u8BF7\u6CE8\u91CA\u6A21\u5757\u5185\u5BB9\n';
	contents += '\t */\n';
	contents += '\t' + componentArr.join('_').toUpperCase() + '_GET: \'\'\n';
	contents += '};\n';
	contents += 'export default api;\n';
	return contents;
};