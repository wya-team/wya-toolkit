'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.list = undefined;

var _helper = require('../utils/helper');

var list = exports.list = function list(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj,
	    mode = opts.pagingMode,
	    type = opts.pagingType;

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
		switch (type) {
			case 'tabs':
				contents += '<template>\n';
				contents += '\t<vc-tabs \n';
				contents += '\t\t:value="type" \n';
				contents += '\t\t:animated="false"\n';
				contents += '\t\ttype="card" \n';
				contents += '\t\tstyle="margin-top: 20px"\n';
				contents += '\t\t@click="handleChange"\n';
				contents += '\t>\n';
				contents += '\t\t<vc-tabs-pane \n';
				contents += '\t\t\tv-for="(item) in tabs"\n';
				contents += '\t\t\t:key="item.value"\n';
				contents += '\t\t\t:label="item.label" \n';
				contents += '\t\t\t:name="item.value"\n';
				contents += '\t\t>\n';
				contents += '\t\t\t<vc-paging\n';
				switch (mode) {
					case 'native':
						contents += '\t\t\t\t:columns="columns"\n';
						break;
					default:

				}
				contents += '\t\t\t\t:show="item.value == type" \n';
				contents += '\t\t\t\t:type="item.value"\n';
				contents += '\t\t\t\t:data-source="listInfo[item.value].data"\n';
				contents += '\t\t\t\t:total="listInfo[item.value].total"\n';
				contents += '\t\t\t\t:count="listInfo[item.value].count"\n';
				contents += '\t\t\t\t:reset="listInfo[item.value].reset"\n';
				contents += '\t\t\t\t:current.sync="current[item.value]"\n';
				contents += '\t\t\t\t:history="true"\n';
				contents += '\t\t\t\t:load-data="loadData"\n';
				contents += '\t\t\t\tclass="v-' + pathArr.join('-') + '-list"\n';
				contents += '\t\t\t\tmode="' + mode + '"\n';
				contents += '\t\t\t\t@page-size-change="handleChangePageSize"\n';
				contents += '\t\t\t>\n';

				switch (mode) {
					case 'table':
						contents += '\t\t\t\t<' + project + '-item />\n';
						break;
					case 'piece':
						contents += '\t\t\t\t<' + project + '-item \n';
						contents += '\t\t\t\t\tslot-scope="it"\n';
						contents += '\t\t\t\t\tv-bind="it"\n';
						contents += '\t\t\t\t\tclass="_item"\n';
						contents += '\t\t\t\t/> \n';
						break;
					case 'native':
						contents += '\t\t\t>\n';
						contents += '\t\t\t\t<' + project + '-item slot-scope="it" v-bind="it" />\n';
						break;
					default:

				}
				contents += '\t\t\t</vc-paging>\n';
				contents += '\t\t</vc-tabs-pane>\n';
				contents += '\t</vc-tabs>\n';
				contents += '</template>\n';
				break;
			default:
				contents += '<template>\n';
				contents += '\t<vc-paging\n';
				contents += '\t\tref="tableTarget"\n';
				switch (mode) {
					case 'native':
					case 'table':
						contents += '\t\t:columns="columns"\n';
						break;
					default:

				}
				contents += '\t\t:data-source="listInfo.data" \n';
				contents += '\t\t:total="listInfo.total"\n';
				contents += '\t\t:reset="listInfo.reset"\n';
				contents += '\t\t:history="true"\n';
				contents += '\t\t:load-data="loadData"\n';
				contents += '\t\tmode="' + mode + '"\n';
				contents += '\t\tclass="g-m-t-20 v-' + pathArr.join('-') + '-list"\n';
				contents += '\t\t@page-size-change="handleChangePageSize"\n';
				contents += '\t>\n';

				switch (mode) {
					case 'table':
						contents += '<' + project + '-item />\n';
						break;
					case 'piece':
						contents += '\t\t<' + project + '-item \n';
						contents += '\t\t\tslot-scope="it"\n';
						contents += '\t\t\tv-bind="it"\n';
						contents += '\t\t\tclass="_item"\n';
						contents += '\t\t/> \n';
						contents += '\t</vc-paging>\n';
						break;
					case 'native':
						contents += '\t>\n';
						contents += '\t\t<' + project + '-item slot-scope="it" v-bind="it" />\n';
						contents += '\t</vc-paging>\n';
						break;
					default:

				}
				contents += '</template>\n';
				break;
		}
		contents += '\n';
		contents += '<script>\n';
		contents += 'import { URL } from \'@utils/utils\';\n';
		contents += 'import Item from \'./item\';\n';

		contents += '\n';
		contents += 'export default {\n';
		contents += '\tname: \'' + project + '-table\',\n';
		contents += '\tcomponents: {\n';
		contents += '\t\t\'' + project + '-item\': Item,\n';
		contents += '\t},\n';
		contents += '\tdata() {\n';
		contents += '\t\tconst { query } = this.$route;\n\n';
		contents += '\t\treturn {\n';
		switch (type) {
			case 'tabs':
				contents += '\t\t\ttype: String(query.type || "1"), // \u540Ctabs\u4E0B\u7684value\n';
				contents += '\t\t\tcurrent: {},\n';
				contents += '\t\t\ttabs: [\n';
				contents += '\t\t\t\t{ label: \'\u6807\u7B7E\u4E00\', value: \'1\' }, \n';
				contents += '\t\t\t\t{ label: \'\u6807\u7B7E\u4E8C\', value: \'2\' }, \n';
				contents += '\t\t\t\t{ label: \'\u6807\u7B7E\u4E09\', value: \'3\' }\n';
				contents += '\t\t\t],\n';
				break;
			default:

		}
		switch (mode) {
			case 'native':
				contents += '\t\t\tcolumns: [\'Header - 1\', \'Header - 2\', \'Header - 3\', \'Header - 4\'],\n';
				break;
			default:

		}
		contents += '\t\t};\n';
		contents += '\t},\n';
		contents += '\tcomputed: {\n';
		contents += '\t\tlistInfo() {\n';
		contents += '\t\t\treturn this.$store.state.' + mutation + extra + '.listInfo;\n';
		contents += '\t\t}\n';
		contents += '\t},\n';
		contents += '\tmethods: {\n';
		contents += '\t\tloadData(page, pageSize) {\n';
		contents += '\t\t\tlet { query = {} } = URL.parse();\n';
		contents += '\t\t\treturn this.request({\n';
		contents += '\t\t\t\turl: \'' + pagingType + '_GET\',\n';
		contents += '\t\t\t\ttype: \'GET\',\n';
		contents += '\t\t\t\tparam: {\n';
		contents += '\t\t\t\t\t...query,\n';
		switch (type) {
			case 'tabs':
				contents += '\t\t\t\t\ttype: this.type,\n';
				break;
			default:

		}
		contents += '\t\t\t\t\tpage,\n';
		contents += '\t\t\t\t\tpageSize\n';
		contents += '\t\t\t\t},\n';
		contents += '\t\t\t}).then((res) => {\n';
		contents += '\t\t\t\tconsole.log(res, \'res\');\n';
		contents += '\t\t\t}).catch((error) => {\n';
		contents += '\t\t\t\tconsole.log(error, \'error\');\n';
		contents += '\t\t\t});\n';
		contents += '\t\t},\n';
		switch (type) {
			case 'tabs':
				contents += '\t\thandleChange(type) {\n';
				contents += '\t\t\tthis.type = type;\n';
				contents += '\n';
				contents += '\t\t\tlet { query = {} } = URL.parse(); // this.$route\u9700\u8981\u8BBE\u7F6Epaging.sync\n';
				contents += '\t\t\tquery = {\n';
				contents += '\t\t\t\t...query,\n';
				contents += '\t\t\t\ttype,\n';
				contents += '\t\t\t\tpage: this.current[type]\n';
				contents += '\t\t\t};\n';
				contents += '\t\t\tthis.$router.replace(URL.merge({ path: \'/' + pathArr.join('/') + '\' , query }));\n';
				contents += '\t\t},\n';
			default:

		}
		contents += '\t\thandleChangePageSize() {\n';
		contents += '\t\t\tthis.$store.commit(\'' + pagingType + '_INIT\');\n';
		contents += '\t\t}\n';
		contents += '\t}\n';
		contents += '};\n';
		contents += '\n';
		contents += '</script>\n';
		contents += '\n';
		contents += '<style lang="scss">\n';
		switch (mode) {
			case 'piece':
				contents += '.v-' + pathArr.join('-') + '-list {\n';
				contents += '\tdisplay: flex;\n';
				contents += '\tflex-wrap: wrap;\n';
				contents += '\tjustify-content: space-between;\n';
				contents += '\tmargin: 20px 0;\n';
				contents += '\t._item {\n';
				contents += '\t\tborder: 1px solid #d4d4d4;\n';
				contents += '\t\tpadding: 20px;\n';
				contents += '\t\tmargin-bottom: 20px;\n';
				contents += '\t\twidth: calc(50% - 10px);\n';
				contents += '\t}\n';
				contents += '}\n';
				break;
			case 'native':
				contents += '.v-' + pathArr.join('-') + '-list table {\n';
				contents += '\twidth: 100%;\n';
				contents += '\tthead {\n';
				contents += '\t\tth {\n';
				contents += '\t\t\ttext-align: left;\n';
				contents += '\t\t\theight: 40px;\n';
				contents += '\t\t\twhite-space: nowrap;\n';
				contents += '\t\t\toverflow: hidden;\n';
				contents += '\t\t\tbackground-color: #f8f8f9;\n';
				contents += '\n';
				contents += '\t\t}\n';
				contents += '\t}\n';
				contents += '\ttbody {\n';
				contents += '\t\tbackground-color: #ffffff;\n';
				contents += '\t\ttd {\n';
				contents += '\t\t\ttext-align: left;\n';
				contents += '\t\t\theight: 40px;\n';
				contents += '\t\t\twhite-space: nowrap;\n';
				contents += '\t\t\toverflow: hidden;\n';
				contents += '\t\t\tborder: 1px solid #ccc!important\n';
				contents += '\t\t}\n';
				contents += '\t\ttr {\n';
				contents += '\t\t\tborder: 1px solid red!important\n';
				contents += '\t\t}\n';
				contents += '\t}\n';
				contents += '}\n';
				break;
			default:

		}
		contents += '\n';
		contents += '</style>\n';
		return contents;
	} catch (e) {
		console.log(e);
		return content;
	}
};