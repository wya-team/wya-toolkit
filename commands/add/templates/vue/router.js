'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var router = exports.router = function router() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var name = opts.name,
	    mutation = opts.mutation,
	    pathArr = opts.pathArr,
	    project = opts.project,
	    obj = opts.obj;

	var contents = '';

	contents += 'export const ' + mutation + 'Config = [\n';
	contents += '\t{\n';
	contents += '\t\tpath: \'/' + mutation + '\',\n';
	contents += '\t\tredirect: \'/' + mutation + '/main\'\n';
	contents += '\t},\n';

	contents += '\t{\n';
	contents += '\t\tpath: \'' + pathArr.join('/') + '\',\n';
	contents += '\t\tname: \'' + pathArr.join('-') + '\',\n';
	contents += '\t\tcomponent: () => import(\'./modules/' + pathArr.join('-') + '.vue\')\n';
	contents += '\t}\n';
	contents += '];\n';
	return contents;
};