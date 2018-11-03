'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var _module = function _module() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj;


	var extra = pathArr.slice(1).map(function (item) {
		return '' + item[0].toUpperCase() + item.slice(1);
	}).join('');

	var contents = '';

	contents += '// import * as types from \'@mutations/' + mutation + '\';\n\n';
	contents += 'const initialState = {\n';
	contents += '\tdata: \'\'\n';
	contents += '};\n\n';
	contents += 'const mutations = {\n';
	contents += '\t' + pathArr.join('_').toUpperCase() + '_GET_SUCCESS(state, { data, param }) {\n';
	contents += '\t\tstate.data = {\n';
	contents += '\t\t\t...data\n';
	contents += '\t\t};\n';
	contents += '\t}\n';
	contents += '};\n\n';
	contents += 'export const ' + mutation + extra + ' = {\n';
	contents += '\tstate: { ...initialState },\n';
	contents += '\tmutations,\n';
	contents += '};\n';

	return contents;
};
exports.module = _module;