'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var component = exports.component = function component() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var name = opts.name,
	    mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj;

	var contents = '';

	contents += '<template>\n';
	contents += '\t<div>\n';
	contents += '\t\t__tpl__\n';
	contents += '\t</div>\n';
	contents += '</template>\n\n';

	contents += '<script>\n\n';
	contents += 'export default {\n';
	contents += '\tname: \'' + project + '-tpl\',\n';
	contents += '\tcomponents: {\n';
	contents += '\t},\n';
	contents += '\tdata() {\n';
	contents += '\t\treturn {\n';
	contents += '\t\t};\n';
	contents += '\tcreated() {\n';
	contents += '\t},\n';
	contents += '\tmethods: {\n';
	contents += '\t},\n';
	contents += '};\n';
	contents += '</script>\n\n';
	contents += '<style lang="scss" scoped>\n';
	contents += '</style>\n';
	return contents;
};