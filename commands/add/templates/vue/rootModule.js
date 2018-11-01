'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var rootModule = exports.rootModule = function rootModule() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;


	var extra = pathArr.slice(1).map(function (item) {
		return '' + item[0].toUpperCase() + item.slice(1);
	}).join('');
	var pathName = '' + pathArr.slice(1).join('-');
	var moduleName = '' + mutation + extra;

	var contents = '';
	contents += 'import { ' + moduleName + ' } from \'./' + pathName + '\';\n';
	contents += '\nexport default {\n';
	contents += '\t' + moduleName;
	contents += '\n};\n';
	return contents;
};

var rootModuleOverride = exports.rootModuleOverride = function rootModuleOverride(content) {
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

		var extra = pathArr.slice(1).map(function (item) {
			return '' + item[0].toUpperCase() + item.slice(1);
		}).join('');
		var pathName = '' + pathArr.slice(1).join('-');
		var moduleName = '' + mutation + extra;

		var moduleContent = 'import { ' + moduleName + ' } from \'./' + pathName + '\';';
		var beforeSplit = '\nexport default {\n';
		var afterSplit = '\n};\n';

		var _content = content.split(beforeSplit);

		var before = _content[0];
		var after = _content[1];

		// import
		if (before && before.includes(moduleContent) === false) {
			before += moduleContent + '\n';
		}

		// 尾部
		var _after = after.split(afterSplit);
		if (_after[0] && _after[0].includes(moduleName) === false) {
			var tag = '';
			if (_after[0].substr(-1) === ',') {
				tag = '\n';
			} else if (_after[0].substr(-2) === ',\n') {
				tag = '';
			} else {
				tag = ",\n";
			}
			_after[0] += tag + '\t' + moduleName;
		}
		after = _after.slice(1).reduce(function (pre, cur) {
			return pre + afterSplit + cur;
		}, _after[0]);

		// 返回
		return _content.slice(2).reduce(function (pre, cur) {
			return pre + afterSplit + cur;
		}, before + beforeSplit + after);
	} catch (e) {
		return content;
	}
};