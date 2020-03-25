const { resolve } = require('path');
const fns = require('./lint/index');

module.exports = (opts = {}) => {
	const { mode = "commit" } = opts;

	if (fns[mode]) {
		fns[mode]();
	} else {
		console.error('[@wya/toolkit]: Invalid Mode');
		process.exit(1);
	}
};