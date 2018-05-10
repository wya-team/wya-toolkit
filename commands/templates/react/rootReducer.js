'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var rootReducer = exports.rootReducer = function rootReducer(name, action) {
	var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	var pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;

	var data = '' + action + name[0].toUpperCase() + name.slice(1);
	var contents = '';
	contents += 'import { ' + data + ' } from \'./' + name + '\';\n';
	contents += 'export default {\n';
	contents += '\t' + data + ',\n';
	contents += '};\n';
	return contents;
};