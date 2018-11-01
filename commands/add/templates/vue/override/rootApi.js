'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var rootApi = exports.rootApi = function rootApi(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var name = opts.name,
	    mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;
	// try {
	// 	if (content.substr(-1) !== '\n') {
	// 		content += '\n';
	// 	}


	// 	let moduleContent = `import ${mutation} from './${mutation}';`;
	// 	let txtSplit = `\nconst API = {\n`;

	// 	let _content = content.split(txtSplit);

	// 	let before = _content[0];
	// 	let after = _content[1];

	// 	// import
	// 	if (before && before.includes(moduleContent) === false) {
	// 		before += `${moduleContent}\n`;
	// 	}

	// 	// 尾部
	// 	if (after[0] && after[0].includes(mutation) === false) {
	// 		after = `	...${mutation},\n` + after;
	// 	}

	// 	// 返回
	// 	return _content.slice(2).reduce((pre, cur) => pre + txtSplit + cur, before + txtSplit + after);
	// } catch (e) {
	// 	return content;
	// }

	try {
		if (content.substr(-1) !== '\n') {
			content += '\n';
		}

		var extra = pathArr.slice(1).map(function (item) {
			return '' + item[0].toUpperCase() + item.slice(1);
		}).join('');
		var pathName = '' + pathArr.slice(1).join('-');
		var moduleName = '' + mutation + extra;

		var moduleContent = 'import ' + mutation + ' from \'./' + mutation + '\';';
		var beforeSplit = '\nconst API = {\n';
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
		if (_after[0] && _after[0].includes(mutation) === false) {
			var tag = '';
			if (_after[0].substr(-1) === ',') {
				tag = '\n';
			} else if (_after[0].substr(-2) === ',\n') {
				tag = '';
			} else {
				tag = ",\n";
			}
			_after[0] += tag + '\t...' + mutation;
		}
		after = _after.slice(1).reduce(function (pre, cur) {
			return pre + afterSplit + cur;
		}, _after[0]);

		// 返回
		return _content.slice(2).reduce(function (pre, cur) {
			return pre + afterSplit + cur;
		}, before + beforeSplit + after);
	} catch (e) {
		console.log(e);
		return content;
	}
};