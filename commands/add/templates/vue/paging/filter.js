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
		contents += '\t\t<vc-button \n';
		contents += '\t\t\ttype="primary"\n';
		contents += '\t\t\tclass="g-m-b-16"\n';
		contents += '\t\t\t@click="handleExport"\n';
		contents += '\t\t>\n';
		contents += '\t\t\t\u5BFC\u51FA\n';
		contents += '\t\t</vc-button>\n';
		contents += '\t\t<div>\n';
		contents += '\t\t\t<span>\u9000\u6B3E\u4FE1\u606F\uFF1A</span>\n';
		contents += '\t\t\t<vc-input\n';
		contents += '\t\t\t\tv-model="keywords.search" \n';
		contents += '\t\t\t\tplaceholder="\u8BF7\u8F93\u5165\u5173\u952E\u5B57\u641C\u7D22" \n';
		contents += '\t\t\t\tstyle="width: 240px" \n';
		contents += '\t\t\t\tclearable\n';
		contents += '\t\t\t\t@enter="handleSearch"\n';
		contents += '\t\t\t\t@change="handleInputChange"\n';
		contents += '\t\t\t/>\n';
		contents += '\t\t\t<vc-button \n';
		contents += '\t\t\t\ttype="primary"\n';
		contents += '\t\t\t\tclass="g-m-l-24"\n';
		contents += '\t\t\t\t@click="handleSearch"\n';
		contents += '\t\t\t>\n';
		contents += '\t\t\t\t\u641C\u7D22\n';
		contents += '\t\t\t</vc-button>\n';
		contents += '\t\t\t<span\n';
		contents += '\t\t\t\tclass="g-m-l-12 g-c-black-dark g-fs-12 g-pointer g-no-select"\n';
		contents += '\t\t\t\t@click="handleToggle"\n';
		contents += '\t\t\t>\n';
		contents += '\t\t\t\t{{ show ? \'\u6536\u8D77\' : \'\u5C55\u5F00\' }}\n';
		contents += '\t\t\t\t<i\n';
		contents += '\t\t\t\t\t:class="show ? \'icon-triangle-up\' : \'icon-triangle-down\'"\n';
		contents += '\t\t\t\t\tclass="iconfont g-fs-12 g-c-black-dark"\n';
		contents += '\t\t\t\t/>\n';
		contents += '\t\t\t</span>\n';
		contents += '\t\t</div>\n';
		contents += '\t\t<vc-expand \n';
		contents += '\t\t\tref="expand"\n';
		contents += '\t\t\tv-model="show"\n';
		contents += '\t\t>\n';
		contents += '\t\t\t<div class="g-pd-t-16">\n';
		contents += '\t\t\t\t<div\n';
		contents += '\t\t\t\t\tclass="g-search-form g-lh-50 g-bg-f4"\n';
		contents += '\t\t\t\t\tstyle="padding-top: 5px; padding-bottom: 5px"\n';
		contents += '\t\t\t\t>\n';
		contents += '\t\t\t\t\t<div class="g-flex g-fw-w" style="min-width: 796px">\n';
		contents += '\t\t\t\t\t\t<div>\n';
		contents += '\t\t\t\t\t\t\t<span class="g-c-333 g-w-100">\u9000\u6B3E\u65B9\u5F0F\uFF1A</span>\n';
		contents += '\t\t\t\t\t\t\t<vc-input\n';
		contents += '\t\t\t\t\t\t\t\tv-model="keywords.name" \n';
		contents += '\t\t\t\t\t\t\t\tstyle="width: 160px" \n';
		contents += '\t\t\t\t\t\t\t\tplaceholder="\u8BF7\u8F93\u5165\u516C\u53F8\u540D\u79F0" \n';
		contents += '\t\t\t\t\t\t\t\t@enter="handleSearch"\n';
		contents += '\t\t\t\t\t\t\t\t@change="handleInputChange"\n';
		contents += '\t\t\t\t\t\t\t/>\n';
		contents += '\t\t\t\t\t\t</div>\n';
		contents += '\t\t\t\t\t\t<div>\n';
		contents += '\t\t\t\t\t\t\t<span class="g-c-333 g-w-100">\u9000\u6B3E\u4F20\u65B9\u5F0F\uFF1A</span>\n';
		contents += '\t\t\t\t\t\t\t<vc-input\n';
		contents += '\t\t\t\t\t\t\t\tv-model="keywords.name" \n';
		contents += '\t\t\t\t\t\t\t\tstyle="width: 220px" \n';
		contents += '\t\t\t\t\t\t\t\tplaceholder="\u8BF7\u8F93\u5165\u516C\u53F8\u540D\u79F0" \n';
		contents += '\t\t\t\t\t\t\t\t@enter="handleSearch"\n';
		contents += '\t\t\t\t\t\t\t\t@change="handleInputChange"\n';
		contents += '\t\t\t\t\t\t\t/>\n';
		contents += '\t\t\t\t\t\t</div>\n';
		contents += '\t\t\t\t\t</div>\n';
		contents += '\t\t\t\t</div>\n';
		contents += '\t\t\t</div>\n';
		contents += '\t\t</vc-expand>\n';
		contents += '\t</div>\n';
		contents += '</template>\n';
		contents += '\n';
		contents += '<script>\n';
		contents += 'import { URL } from \'@utils/utils\';\n';
		contents += 'import { debounce } from \'lodash\';\n';
		contents += '\n';
		contents += 'export default {\n';
		contents += '\tname: \'' + project + '-filter\',\n';
		contents += '\tcomponents: {\n';
		contents += '\t},\n';
		contents += '\tdata() {\n';
		contents += '\t\tconst { query = {} } = this.$route;\n';
		contents += '\t\treturn {\n';
		contents += '\t\t\tkeywords: {\n';
		contents += '\t\t\t\tsearch: String(query.search || \'\'),\n';
		contents += '\t\t\t\tname: String(query.name || \'\'),\n';
		contents += '\t\t\t},\n';
		contents += '\t\t\tshow: false,\n';
		contents += '\t\t};\n';
		contents += '\t},\n';
		contents += '\tmethods: {\n';
		contents += '\t\thandleSearch: debounce(function (value) {\n';
		contents += '\t\t\tlet query = {\n';
		contents += '\t\t\t\t...this.$route.query,\n';
		contents += '\t\t\t\t...this.keywords,\n';
		contents += '\t\t\t};\n';
		contents += '\t\t\tthis.$router.replace(URL.merge({\n';
		contents += '\t\t\t\tpath: \'/' + pathArr.join('/') + '\', \n';
		contents += '\t\t\t\tquery\n';
		contents += '\t\t\t}));\n';
		contents += '\t\t\tthis.$store.commit(\'' + pagingType + '_INIT\');\n';
		contents += '\t\t}, 300),\n';
		contents += '\t\thandleToggle() {\n';
		contents += '\t\t\tthis.$refs.expand.toggle();\n';
		contents += '\t\t},\n';
		contents += '\t\thandleChange(obj) {\n';
		contents += '\t\t\tlet type = Object.keys(obj)[0];\n';
		contents += '\t\t\tlet value = obj[type];\n';
		contents += '\t\t\tthis.keywords[type] = value;\n';
		contents += '\t\t\tthis.handleSearch();\n';
		contents += '\t\t},\n';
		contents += '\t\thandleInputChange(e) {\n';
		contents += '\t\t\tif (!e.target.value) {\n';
		contents += '\t\t\t\tthis.handleSearch();\n';
		contents += '\t\t\t}\n';
		contents += '\t\t},\n';
		contents += '\t\thandleExport() {}\n';
		contents += '\t}\n';
		contents += '};\n';
		contents += '\n';
		contents += '</script>\n';
		contents += '\n';
		contents += '<style lang="scss">\n';
		contents += '\n';
		contents += '</style>\n';

		return contents;
	} catch (e) {
		console.log(e);
		return content;
	}
};