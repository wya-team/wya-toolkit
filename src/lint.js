const { resolve } = require('path');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
const exec = require('child_process').exec;

module.exports = (opts = {}) => {
	const { mode = "commit" } = opts;
	let $process;
	switch (mode) {
		case "commit":
			$process = exec(`node ${resolve(__dirname, './lint/commit.js')}`);
			$process.stdout.on('data', stdout => console.info(stdout));
			$process.stderr.on('data', stderr => { console.info(stderr); process.exit(1); });
			break;
		default:
			
	}
};