'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mutation = undefined;

var _helper = require('../utils/helper');

var mutation = exports.mutation = function mutation(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj;

	try {
		if (pathArr.includes('list') === false) {
			var mutationType = pathArr.join('_').toUpperCase() + '_GET';
			var _mutationType = pathArr.join('_').toUpperCase() + '_LIST_GET';

			// 旧的保留
			// let oldContent = `export const ${mutationType} = '${mutationType}';`;
			var newContent = 'export const ' + _mutationType + ' = \'' + _mutationType + '\';';

			if (content.includes(newContent) === false) {
				content += newContent + '\n';
			}
		}
		return content;
	} catch (e) {
		console.log(e);
		return content;
	}
};