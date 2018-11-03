"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var container = exports.container = function container(content) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj;

	var contents = '';
	contents += "<template>\n";
	contents += "\t<set-title title=\"" + pathArr.join("-") + "\" style=\"padding: 20px\">\n";
	contents += "\t\t<" + project + "-content />\n";
	contents += "\t</set-title>\n";
	contents += "</template>\n";
	contents += "\n";
	contents += "<script>\n";
	contents += "import Content from '@components/" + mutation + "/" + pathArr.slice(1).join("-") + "/content';\n";
	contents += "\n";
	contents += "export default {\n";
	contents += "\tname: '" + project + "-" + pathArr.join("-") + "',\n";
	contents += "\tcomponents: {\n";
	contents += "\t\t\"" + project + "-content\": Content,\n";
	contents += "\t},\n";
	contents += "\tdata() {\n";
	contents += "\t\treturn {\n";
	contents += "\t\t};\n";
	contents += "\t},\n";
	contents += "\tcreated() {\n";
	contents += "\t},\n";
	contents += "\tmethods: {\n";
	contents += "\t},\n";
	contents += "};\n";
	contents += "</script>\n";
	contents += "\n";
	contents += "<style lang=\"scss\" scoped>\n";
	contents += "</style>\n";
	return contents;
};