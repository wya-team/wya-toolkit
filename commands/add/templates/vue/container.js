"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var container = exports.container = function container() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var name = opts.name,
	    mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj;

	var contents = '';

	contents += "<template>\n";
	contents += "\t<set-title title=\"" + pathArr.join("-") + "\">\n";
	contents += "\t\t<" + project + "-tpl />\n";
	contents += "\t</set-title>\n";
	contents += "</template>\n\n";

	contents += "<script>\n\n";
	contents += "import Tpl from '@components/" + pathArr[0] + "/" + pathArr.slice(1).join("-") + "/__tpl__';\n\n";
	contents += "export default {\n";
	contents += "\tname: '" + project + "-" + pathArr.join("-") + "',\n";
	contents += "\tcomponents: {\n";
	contents += "\t\t'" + project + "-tpl': Tpl\n";
	contents += "\t},\n";
	contents += "\tdata() {\n";
	contents += "\t\treturn {\n";
	contents += "\t\t};\n";
	contents += "\tcreated() {\n";
	contents += "\t},\n";
	contents += "\tmethods: {\n";
	contents += "\t},\n";
	contents += "};\n";
	contents += "</script>\n\n";
	contents += "<style lang=\"scss\" scoped>\n";
	contents += "</style>\n";
	return contents;
};