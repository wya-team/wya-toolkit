'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var rootRoute = exports.rootRoute = function rootRoute(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var name = opts.name,
	    mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;

	try {
		if (content.substr(-1) !== '\n') {
			content += '\n';
		}

		var moduleContent = 'import { ' + mutation + 'Config } from \'../containers/' + mutation + '/app\';';
		var txtSplit = '\nexport const routeConfig = {\n';

		var _content = content.split(txtSplit);

		var before = _content[0];
		var after = _content[1];

		// import
		if (before && before.includes(moduleContent) === false) {
			before += moduleContent + '\n';
		}

		// 尾部
		if (after[0] && after[0].includes(mutation) === false) {}
		// 待补充


		// 返回
		return _content.slice(2).reduce(function (pre, cur) {
			return pre + txtSplit + cur;
		}, before + txtSplit + after);
	} catch (e) {
		return content;
	}
};