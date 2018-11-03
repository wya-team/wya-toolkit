'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var getNewContent = exports.getNewContent = function getNewContent() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var content = opts.content,
	    importContent = opts.importContent,
	    injectContent = opts.injectContent,
	    importSplit = opts.importSplit,
	    injectSplit = opts.injectSplit;


	try {
		if (content.substr(-1) !== '\n') {
			content += '\n';
		}
		var before = '';
		var after = '';
		var _content = '';

		if (importSplit && importContent) {
			_content = content.split(importSplit);

			before = _content[0];
			after = _content[1];

			// import
			if (before && before.includes(importContent) === false) {
				before += importContent + '\n';
			}
		} else {
			after = content;
		}

		// inject
		var _after = after.split(injectSplit);
		if (_after.length > 1 && _after[0].includes(injectContent) === false) {
			var tag = '';
			if (_after[0].substr(-1) === ',') {
				tag = '\n';
			} else if (_after[0].substr(-2) === ',\n') {
				tag = '';
			} else {
				tag = ",\n";
			}
			_after[0] += '' + tag + injectContent;
		}

		after = _after.slice(1).reduce(function (pre, cur) {
			return pre + injectSplit + cur;
		}, _after[0]);

		if (importSplit && importContent) {
			return _content.slice(2).reduce(function (pre, cur) {
				return pre + importSplit + cur;
			}, before + importSplit + after);
		} else {
			return after;
		}
		// 返回
	} catch (e) {
		return content;
	}
};