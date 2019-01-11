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
		contents += '\t\t<div>\n';
		contents += '\t\t\t<i-input\n';
		contents += '\t\t\t\tv-model="keyword" \n';
		contents += '\t\t\t\tsize="large" \n';
		contents += '\t\t\t\tplaceholder="\u8BF7\u8F93\u5165\u5173\u952E\u5B57\u641C\u7D22" \n';
		contents += '\t\t\t\tstyle="width: 320px" \n';
		contents += '\t\t\t/>\n';
		contents += '\t\t\t<i-button \n';
		contents += '\t\t\t\ttype="primary"\n';
		contents += '\t\t\t\tclass="g-m-l-10"\n';
		contents += '\t\t\t\t@click="handleSearch"\n';
		contents += '\t\t\t>\n';
		contents += '\t\t\t\t\u641C\u7D22\n';
		contents += '\t\t\t</i-button>\n';
		contents += '\t\t\t<span \n';
		contents += '\t\t\t\tclass="g-m-l-20 g-c-black-dark g-fs-12 g-pointer"\n';
		contents += '\t\t\t\t@click="handleToggle" \n';
		contents += '\t\t\t>\n';
		contents += '\t\t\t\t\u66F4\u591A\u641C\u7D22\u6761\u4EF6\n';
		contents += '\t\t\t\t<i \n';
		contents += '\t\t\t\t\t:class="show ? \'icon-triangle-up\' : \'icon-triangle-down\'" \n';
		contents += '\t\t\t\t\tclass="iconfont g-fs-12 g-c-black-dark"\n';
		contents += '\t\t\t\t/>\n';
		contents += '\t\t\t</span>\n';
		contents += '\t\t</div>\n';
		contents += '\t\t<vc-expand \n';
		contents += '\t\t\tref="expand"\n';
		contents += '\t\t\tv-model="show"\n';
		contents += '\t\t>\n';
		contents += '\t\t\t<div class="g-m-t-10 g-bg-gray-mid g-pd-20">\n';
		contents += '\t\t\t\t<i-input\n';
		contents += '\t\t\t\t\tv-model="name" \n';
		contents += '\t\t\t\t\tsize="large" \n';
		contents += '\t\t\t\t\tplaceholder="\u8BF7\u8F93\u5165\u516C\u53F8\u540D\u79F0" \n';
		contents += '\t\t\t\t\tstyle="width: 220px" \n';
		contents += '\t\t\t\t/>\n';
		contents += '\t\t\t</div>\n';
		contents += '\t\t</vc-expand>\n';
		contents += '\t</div>\n';
		contents += '</template>\n';
		contents += '\n';
		contents += '<script>\n';
		contents += 'import { Input, Button } from \'iview\';\n';
		contents += 'import { Expand } from \'wya-vc\';\n';
		contents += 'import { getParseUrl, getHashUrl } from \'@utils/utils\';\n';
		contents += '\n';
		contents += 'export default {\n';
		contents += '\tname: \'' + project + '-filter\',\n';
		contents += '\tcomponents: {\n';
		contents += '\t\t\'i-input\': Input,\n';
		contents += '\t\t\'i-button\': Button,\n';
		contents += '\t\t\'vc-expand\': Expand\n';
		contents += '\t},\n';
		contents += '\tdata() {\n';
		contents += '\t\tconst { query = {} } = this.$route;\n';
		contents += '\t\treturn {\n';
		contents += '\t\t\tkeyword: String(query.keyword || \'\'),\n';
		contents += '\t\t\tname: String(query.name || \'\'),\n';
		contents += '\t\t\tshow: false\n';
		contents += '\t\t};\n';
		contents += '\t},\n';
		contents += '\tmethods: {\n';
		contents += '\t\thandleSearch(event) {\n';
		contents += '\t\t\tthis.$router.replace(getHashUrl(\n';
		contents += '\t\t\t\t\'/' + pathArr.join('/') + '\', \n';
		contents += '\t\t\t\t{ \n';
		contents += '\t\t\t\t\t...this.$route.query, \n';
		contents += '\t\t\t\t\tkeyword: this.keyword,\n';
		contents += '\t\t\t\t\tname: this.name\n';
		contents += '\t\t\t\t}\n';
		contents += '\t\t\t));\n';
		contents += '\t\t\tthis.$store.commit(\'' + pagingType + '_INIT\');\n';
		contents += '\t\t},\n';
		contents += '\t\thandleToggle() {\n';
		contents += '\t\t\tthis.$refs.expand.toggle();\n';
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