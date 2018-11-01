'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var rootModule = exports.rootModule = function rootModule() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var name = opts.name,
	    mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;

	var extra = pathArr.slice(1).map(function (item) {
		return '' + item[0].toUpperCase() + item.slice(1);
	});
	var data = '' + mutation + extra;

	var contents = '';
	contents += 'import { ' + data + ' } from \'./' + extra + '\';\n\n';
	contents += 'export default {\n';
	contents += '\t' + data + ',\n';
	contents += '};\n';
	return contents;
};