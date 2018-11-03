'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.item = undefined;

var _helper = require('../utils/helper');

var item = exports.item = function item(content) {
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

	var contents = '';
	try {
		switch (mode) {
			case 'table':
				contents += 'export default {\n';
				contents += '\tdata() {\n';
				contents += '\t\treturn {\n';
				contents += '\t\t\tcolumns: [\n';
				contents += '\t\t\t\t{\n';
				contents += '\t\t\t\t\ttitle: \'Title\',\n';
				contents += '\t\t\t\t\tkey: \'title\'\n';
				contents += '\t\t\t\t},\n';
				contents += '\t\t\t\t{\n';
				contents += '\t\t\t\t\ttitle: \'Status\',\n';
				contents += '\t\t\t\t\tkey: \'status\',\n';
				contents += '\t\t\t\t\trender: (h, params) => {\n';
				contents += '\t\t\t\t\t\treturn h(\'div\', {\n';
				contents += '\t\t\t\t\t\t\tstyle: {\n';
				contents += '\t\t\t\t\t\t\t\tmarginRight: \'5px\'\n';
				contents += '\t\t\t\t\t\t\t},\n';
				contents += '\t\t\t\t\t\t\ton: {\n';
				contents += '\t\t\t\t\t\t\t\tclick: this.handleResetFirst\n';
				contents += '\t\t\t\t\t\t\t}\n';
				contents += '\t\t\t\t\t\t}, \'\u56DE\u5230\u9996\u9875\u5237\u65B0\');\n';
				contents += '\t\t\t\t\t}\n';
				contents += '\t\t\t\t},\n';
				contents += '\t\t\t\t{\n';
				contents += '\t\t\t\t\ttitle: \'Opt\',\n';
				contents += '\t\t\t\t\tkey: \'opt\',\n';
				contents += '\t\t\t\t\trender: (h, params) => {\n';
				contents += '\t\t\t\t\t\treturn h(\'div\', {\n';
				contents += '\t\t\t\t\t\t\tstyle: {\n';
				contents += '\t\t\t\t\t\t\t\tmarginRight: \'5px\'\n';
				contents += '\t\t\t\t\t\t\t},\n';
				contents += '\t\t\t\t\t\t\ton: {\n';
				contents += '\t\t\t\t\t\t\t\tclick: this.handleResetCur\n';
				contents += '\t\t\t\t\t\t\t}\n';
				contents += '\t\t\t\t\t\t}, \'\u5F53\u524D\u9875\u5237\u65B0\');\n';
				contents += '\t\t\t\t\t}\n';
				contents += '\t\t\t\t},\n';
				contents += '\t\t\t\t{\n';
				contents += '\t\t\t\t\ttitle: \'Link\',\n';
				contents += '\t\t\t\t\tkey: \'link\',\n';
				contents += '\t\t\t\t\trender: (h, params) => {\n';
				contents += '\t\t\t\t\t\treturn h(\'div\', {\n';
				contents += '\t\t\t\t\t\t\tstyle: {\n';
				contents += '\t\t\t\t\t\t\t\tmarginRight: \'5px\'\n';
				contents += '\t\t\t\t\t\t\t},\n';
				contents += '\t\t\t\t\t\t\ton: {\n';
				contents += '\t\t\t\t\t\t\t\tclick: this.handleLinkTo\n';
				contents += '\t\t\t\t\t\t\t}\n';
				contents += '\t\t\t\t\t\t}, \'\u8DF3\u8F6C\u5230paging-tabs\');\n';
				contents += '\t\t\t\t\t}\n';
				contents += '\t\t\t\t}\n';
				contents += '\t\t\t],\n';
				contents += '\t\t};\n';
				contents += '\t},\n';
				contents += '\tmethods: {\n';
				contents += '\t\thandleResetFirst() {\n';
				contents += '\t\t\tthis.$store.commit(\'' + pagingType + '_INIT\');\n';
				contents += '\t\t},\n';
				contents += '\t\thandleResetCur() {\n';
				contents += '\t\t\tthis.$store.commit(\'' + pagingType + '_RESET\');\n';
				contents += '\t\t},\n';
				contents += '\t\thandleLinkTo() {\n';
				contents += '\t\t\tthis.$router.push(\'/\');\n';
				contents += '\t\t},\n';
				contents += '\t}\n';
				contents += '};\n';
				contents += '\n';
				break;
			case 'piece':
				contents += '<template>\n';
				contents += '\t<div :key="id">\n';
				contents += '\t\t<div>{{ name }}</div>\n';
				contents += '\t\t<div @click="handleResetFirst">\u56DE\u5230\u9996\u9875\u5237\u65B0</div>\n';
				contents += '\t\t<div @click="handleResetCur">\u5F53\u524D\u9875\u5237\u65B0</div>\n';
				contents += '\t</div>\n';
				contents += '</template>\n';
				contents += '\n';
				contents += '<script>\n';
				contents += 'export default {\n';
				contents += '\tname: "' + project + '-item",\n';
				contents += '\tprops: {\n';
				contents += '\t\tid: [String, Number],\n';
				contents += '\t\tname: String\n';
				contents += '\t},\n';
				contents += '\tmethods: {\n';
				contents += '\t\thandleResetFirst() {\n';
				contents += '\t\t\tthis.$store.commit(\'' + pagingType + '_INIT\');\n';
				contents += '\t\t},\n';
				contents += '\t\thandleResetCur() {\n';
				contents += '\t\t\tthis.$store.commit(\'' + pagingType + '_RESET\');\n';
				contents += '\t\t}\n';
				contents += '\t}\n';
				contents += '};\n';
				contents += '</script>\n';
				break;
			case 'native':
				contents += '<template>\n';
				contents += '\t<tbody>\n';
				contents += '\t\t<template v-for="item in data">\n';
				contents += '\t\t\t<vc-fragment :key="item.id">\n';
				contents += '\t\t\t\t<tr>\n';
				contents += '\t\t\t\t\t<td colspan="4">\n';
				contents += '\t\t\t\t\t\t{{ item.name }}\n';
				contents += '\t\t\t\t\t</td>\n';
				contents += '\t\t\t\t</tr>\n';
				contents += '\t\t\t\t<tr>\n';
				contents += '\t\t\t\t\t<td>\n';
				contents += '\t\t\t\t\t\t<div class="_table-cell">\n';
				contents += '\t\t\t\t\t\t\t111\n';
				contents += '\t\t\t\t\t\t</div>\n';
				contents += '\t\t\t\t\t</td>\n';
				contents += '\t\t\t\t\t<td rowspan="2">\n';
				contents += '\t\t\t\t\t\t<div class="_table-cell">\n';
				contents += '\t\t\t\t\t\t\t222\n';
				contents += '\t\t\t\t\t\t</div>\n';
				contents += '\t\t\t\t\t</td>\n';
				contents += '\t\t\t\t\t<td>\n';
				contents += '\t\t\t\t\t\t<div class="_table-cell">\n';
				contents += '\t\t\t\t\t\t\t333\n';
				contents += '\t\t\t\t\t\t</div>\n';
				contents += '\t\t\t\t\t</td>\n';
				contents += '\t\t\t\t\t<td rowspan="2">\n';
				contents += '\t\t\t\t\t\t<div class="_table-cell">\n';
				contents += '\t\t\t\t\t\t\t444\n';
				contents += '\t\t\t\t\t\t</div>\n';
				contents += '\t\t\t\t\t</td>\n';
				contents += '\t\t\t\t</tr>\n';
				contents += '\t\t\t\t<tr >\n';
				contents += '\t\t\t\t\t<td>\n';
				contents += '\t\t\t\t\t\t<div class="_table-cell" @click="handleResetFirst">\n';
				contents += '\t\t\t\t\t\t\t\u56DE\u5230\u9996\u9875\u5237\u65B0\n';
				contents += '\t\t\t\t\t\t</div>\n';
				contents += '\t\t\t\t\t</td>\n';
				contents += '\t\t\t\t\t<td>\n';
				contents += '\t\t\t\t\t\t<div class="_table-cell" @click="handleResetCur">\n';
				contents += '\t\t\t\t\t\t\t\u5F53\u524D\u9875\u5237\u65B0\n';
				contents += '\t\t\t\t\t\t</div>\n';
				contents += '\t\t\t\t\t</td>\n';
				contents += '\t\t\t\t</tr>\n';
				contents += '\t\t\t</vc-fragment>\n';
				contents += '\t\t</template>\n';
				contents += '\t</tbody>\n';
				contents += '</template>\n';
				contents += '<script>\n';
				contents += 'import { Fragment } from \'wya-vc\';\n';
				contents += '\n';
				contents += 'export default {\n';
				contents += '\tname: \'' + project + '-item\',\n';
				contents += '\tcomponents: {\n';
				contents += '\t\t\'vc-fragment\': Fragment\n';
				contents += '\t},\n';
				contents += '\tprops: {\n';
				contents += '\t\tit: [Object, Array],\n';
				contents += '\t\tdata: {\n';
				contents += '\t\t\ttype: Array,\n';
				contents += '\t\t\tdefault: () => ([])\n';
				contents += '\t\t},\n';
				contents += '\t},\n';
				contents += '\tcreated() {\n';
				contents += '\t},\n';
				contents += '\tmethods: {\n';
				contents += '\t\thandleResetFirst() {\n';
				contents += '\t\t\tthis.$store.commit(\'' + pagingType + '_INIT\');\n';
				contents += '\t\t},\n';
				contents += '\t\thandleResetCur() {\n';
				contents += '\t\t\tthis.$store.commit(\'' + pagingType + '_RESET\');\n';
				contents += '\t\t},\n';
				contents += '\t\thandleLinkTo() {\n';
				contents += '\t\t\tthis.$router.push(\'/\');\n';
				contents += '\t\t},\n';
				contents += '\t}\n';
				contents += '};\n';
				contents += '</script>\n';
				break;
			default:

		}
		return contents;
	} catch (e) {
		return content;
	}
};