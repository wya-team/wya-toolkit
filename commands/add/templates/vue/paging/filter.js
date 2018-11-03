'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.filter = undefined;

var _helper = require('../utils/helper');

var filter = exports.filter = function filter(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj,
	    mode = opts.pagingMode;

	var extra = pathArr.slice(1).map(function (item) {
		return '' + item[0].toUpperCase() + item.slice(1);
	}).join('');

	var mutationType = '' + pathArr.join('_').toUpperCase();
	var pagingType = mutationType;

	if (pathArr.includes('list') === false) {
		pagingType = mutationType + '_LIST';
	}

	try {
		var contents = '';
		contents += '<template>\n';
		contents += '\t<div>\n';
		contents += '\t\t<i-input\n';
		contents += '\t\t\tv-model="keyword" \n';
		contents += '\t\t\tsize="large" \n';
		contents += '\t\t\tplaceholder="\u8BF7\u8F93\u5165\u5173\u952E\u5B57\u641C\u7D22" \n';
		contents += '\t\t\tstyle="width: 320px" \n';
		contents += '\t\t/>\n';
		contents += '\t\t<i-button \n';
		contents += '\t\t\ttype="primary"\n';
		contents += '\t\t\t@click="handleSearch"\n';
		contents += '\t\t>\n';
		contents += '\t\t\t\u641C\u7D22\n';
		contents += '\t\t</i-button>\n';
		contents += '\t</div>\n';
		contents += '</template>\n';
		contents += '\n';
		contents += '<script>\n';
		contents += 'import { Input, Button } from \'iview\';\n';
		contents += 'import { getParseUrl, getHashUrl } from \'@utils/utils\';\n';
		contents += '\n';
		contents += 'export default {\n';
		contents += '\tname: \'' + project + '-filter\',\n';
		contents += '\tcomponents: {\n';
		contents += '\t\t\'i-input\': Input,\n';
		contents += '\t\t\'i-button\': Button,\n';
		contents += '\t},\n';
		contents += '\tdata() {\n';
		contents += '\t\tconst { query = {} } = this.$route;\n';
		contents += '\t\treturn {\n';
		contents += '\t\t\tkeyword: String(query.keyword || \'\'),\n';
		contents += '\t\t};\n';
		contents += '\t},\n';
		contents += '\tmethods: {\n';
		contents += '\t\thandleSearch(event) {\n';
		contents += '\t\t\tthis.$router.replace(getHashUrl(\n';
		contents += '\t\t\t\t\'/' + pathArr.join('/') + '\', \n';
		contents += '\t\t\t\t{ ...this.$route.query, keyword: this.keyword }\n';
		contents += '\t\t\t));\n';
		contents += '\t\t\tthis.$store.commit(\'' + pagingType + '_INIT\');\n';
		contents += '\t\t}\n';
		contents += '\t}\n';
		contents += '};\n';
		contents += '\n';
		contents += '</script>\n';
		contents += '\n';
		contents += '<style lang="scss" scoped>\n';
		contents += '\n';
		contents += '</style>\n';
		return contents;
	} catch (e) {
		console.log(e);
		return content;
	}
};