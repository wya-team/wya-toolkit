const commit = require('./commit.js');
const prePush = require('./pre-push.js');

module.exports = {
	commit,
	'pre-push': prePush
};