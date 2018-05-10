'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var reducer = exports.reducer = function reducer(name, action) {
	var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	var pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;

	var contents = '';
	contents += 'import * as types from \'@constants/actions/' + action + '\';\n';
	contents += 'const initialState = {\n';
	contents += '\tisFetching: 0, // \u662F\u5426\u5DF2\u7ECF\u83B7\u53D6\n';
	contents += '\tdidInvalidate: 1, // \u662F\u5426\u5931\u6548\n';
	contents += '};\n';
	contents += 'export const ' + action + name[0].toUpperCase() + name.slice(1) + ' = (state = initialState, action) => {\n';
	contents += '\tswitch (action.type) {\n';
	contents += '\t\tcase types.' + componentArr.join('_').toUpperCase() + ' + \'_GET\':\n';
	contents += '\t\t\treturn state;\n';
	contents += '\t\tdefault:\n';
	contents += '\t\t\treturn state;\n';
	contents += '\t}\n';
	contents += '};\n';
	return contents;
};