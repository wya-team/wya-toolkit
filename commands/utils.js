'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.localIp = exports.openURL = undefined;

var _child_process = require('child_process');

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 打开网页（部分兼容）
 * http://stackoverflow.com/a/16099450/222893
 */
var openURL = exports.openURL = function openURL(url) {
	switch (process.platform) {
		case 'darwin':
			(0, _child_process.exec)('open ' + url);
			break;
		case 'win32':
			(0, _child_process.exec)('start ' + url);
			break;
		default:
			(0, _child_process.spawn)('xdg-open', [url]);
	}
};

var localIp = exports.localIp = function () {
	var ips = [];
	var ntwk = _os2.default.networkInterfaces();
	for (var k in ntwk) {
		for (var i = 0; i < ntwk[k].length; i++) {
			var _add = ntwk[k][i].address;
			if (_add && _add.split('.').length == 4 && !ntwk[k][i].internal && ntwk[k][i].family == 'IPv4') {
				ips.push(ntwk[k][i].address);
			}
		}
	}
	return ips[0] || 'localhost';
}();