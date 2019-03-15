'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var container = exports.container = function container(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj,
	    type = opts.pagingType,
	    title = opts.title;

	var contents = '';
	contents += '<template>\n';
	contents += '\t<set-title title="' + title + '"  style="padding: 16px 24px 24px">\n';
	contents += '\t\t<' + project + '-filter />\n';
	contents += '\t\t<' + project + '-' + (type === 'tabs' ? 'tabs-' : '') + 'list />\n';
	contents += '\t</set-title>\n';
	contents += '</template>\n';
	contents += '\n';
	contents += '<script>\n';
	contents += 'import ' + (type === 'tabs' ? 'Tabs' : '') + 'List from \'@components/' + mutation + '/' + pathArr.slice(1).join("-") + '/' + (type === 'tabs' ? 'tabs-' : '') + 'list\';\n';
	contents += 'import Filter from \'@components/' + mutation + '/' + pathArr.slice(1).join("-") + '/filter\';\n';
	contents += 'import navigator from \'@extends/mixins/navigator\';\n';
	contents += '\n';
	contents += 'export default {\n';
	contents += '\tname: \'' + project + '-' + pathArr.join("-") + '\',\n';
	contents += '\tcomponents: {\n';
	contents += '\t\t"' + project + '-' + (type === 'tabs' ? 'tabs-' : '') + 'list": ' + (type === 'tabs' ? 'Tabs' : '') + 'List,\n';
	contents += '\t\t"' + project + '-filter": Filter,\n';
	contents += '\t},\n';
	contents += '\tmixins: [navigator(\'' + pathArr.join('_').toUpperCase() + '\')],\n';
	contents += '\tdata() {\n';
	contents += '\t\treturn {\n';
	contents += '\t\t};\n';
	contents += '\t},\n';
	contents += '\tcreated() {\n';
	contents += '\t},\n';
	contents += '\tmethods: {\n';
	contents += '\t},\n';
	contents += '};\n';
	contents += '</script>\n';
	contents += '\n';
	contents += '<style lang="scss" scoped>\n';
	contents += '</style>\n';
	return contents;
};