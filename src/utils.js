import { exec, spawn } from 'child_process';
import os from 'os';

/**
 * 打开网页（部分兼容）
 * http://stackoverflow.com/a/16099450/222893
 */
export const openURL =  (url) => {
	switch (process.platform) {
		case 'darwin':
			exec(`open ${url}`);
			break;
		case 'win32':
			exec(`start ${url}`);
			break;
		default:
			spawn('xdg-open', [url]);
	}
};

export const localIp = (() => {
	let ips = [];
	let ntwk = os.networkInterfaces();
	for (let k in ntwk) {
		for (let i = 0; i < ntwk[k].length; i++) {
			let _add = ntwk[k][i].address;
			if (_add && _add.split('.').length == 4 && !ntwk[k][i].internal && ntwk[k][i].family == 'IPv4') {
				ips.push(ntwk[k][i].address);
			}
		}
	}
	return ips[0] || 'localhost';
})();