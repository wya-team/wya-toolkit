'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.module = undefined;

var _helper = require('../utils/helper');

var _module = function _module(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj,
	    type = opts.pagingType;

	try {
		var extra = pathArr.slice(1).map(function (item) {
			return '' + item[0].toUpperCase() + item.slice(1);
		}).join('');
		var mutationType = '' + pathArr.join('_').toUpperCase();
		var pagingType = mutationType;

		if (pathArr.includes('list') === false) {
			pagingType = mutationType + '_LIST';
		}

		var contents = '';

		contents += 'import { initPage } from \'@utils/utils\';\n\n';
		contents += 'const initialState = {\n';
		contents += '\tlistInfo: {\n';
		switch (type) {
			case 'tabs':
				contents += '\t\t\'1\': {\n';
				contents += '\t\t\t...initPage\n';
				contents += '\t\t},\n';
				contents += '\t\t\'2\': {\n';
				contents += '\t\t\t...initPage\n';
				contents += '\t\t},\n';
				contents += '\t\t\'3\': {\n';
				contents += '\t\t\t...initPage\n';
				contents += '\t\t},\n';
				break;
			default:
				contents += '\t\t...initPage\n';
				break;
		}
		contents += '\t}\n';
		contents += '};\n\n';
		contents += 'const mutations = {\n';
		contents += '\t' + pagingType + '_GET_SUCCESS(state, { data, param: { type, page } }) {\n';
		contents += '\t\tstate.listInfo = {\n';
		contents += '\t\t\t...state.listInfo,\n';
		switch (type) {
			case 'tabs':
				contents += '\t\t\t[type]: {\n';
				contents += '\t\t\t\t...state.listInfo[type],\n';
				contents += '\t\t\t\ttotal: data.totalCount,\n';
				contents += '\t\t\t\tdata: {\n';
				contents += '\t\t\t\t\t...state.listInfo[type].data,\n';
				contents += '\t\t\t\t\t[page]: data.list\n';
				contents += '\t\t\t\t}\n';
				contents += '\t\t\t}\n';
				break;
			default:
				contents += '\t\t\ttotal: data.totalCount,\n';
				contents += '\t\t\tdata: {\n';
				contents += '\t\t\t\t...state.listInfo.data,\n';
				contents += '\t\t\t\t[page]: data.list\n';
				contents += '\t\t\t}\n';
				break;
		}
		contents += '\t\t};\n';
		contents += '\t},\n';
		contents += '\t' + pagingType + '_RESET(state, payload) {\n';
		contents += '\t\tstate.listInfo = {\n';
		contents += '\t\t\t...initialState.listInfo,\n';
		switch (type) {
			case 'tabs':
				contents += '\t\t\t[type]: {\n';
				contents += '\t\t\t\t...initPage,\n';
				contents += '\t\t\t\treset: true\n';
				contents += '\t\t\t}\n';
				break;
			default:
				contents += '\t\t\treset: true\n';
				break;

		}

		contents += '\t\t};\n';
		contents += '\t},\n';
		contents += '\t' + pagingType + '_INIT(state, payload) {\n';
		contents += '\t\tstate.listInfo = {\n';
		contents += '\t\t\t...initialState.listInfo\n';
		contents += '\t\t};\n';
		contents += '\t},\n';
		contents += '\t' + mutationType + '_ROUTE_CHANGE(state, payload) {\n';
		contents += '\t\tstate.listInfo = {\n';
		contents += '\t\t\t...initialState.listInfo\n';
		contents += '\t\t};\n';
		contents += '\t},\n';
		contents += '};\n\n';
		contents += 'export const ' + mutation + extra + ' = {\n';
		contents += '\tstate: { ...initialState },\n';
		contents += '\tmutations,\n';
		contents += '};\n';
		return contents;
	} catch (e) {
		console.log(e);
		return content;
	}
};
exports.module = _module;