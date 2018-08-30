'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var router = exports.router = function router(name, action) {
	var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	var pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;

	var contents = '';
	contents += 'import { redirectUserToLogin, redirectUserToHome } from \'@router/auth\';\n';
	contents += 'export const ' + action + 'Config = [\n';
	contents += '\t{\n';
	contents += '\t\tpath: \'/' + action + '\',\n';
	contents += '\t\tchildRoutes: [\n';
	contents += '\t\t\t{\n';
	contents += '\t\t\t\tpath: \'' + pathArr.slice(1).join('/') + '\',\n';
	contents += '\t\t\t\tgetComponent: (nextState, cb) => {\n';
	contents += '\t\t\t\t\trequire.ensure([], (require) => {\n';
	contents += '\t\t\t\t\t\tcb(null, require(\'./Modules/' + name + '\').default);\n';
	contents += '\t\t\t\t\t});\n';
	contents += '\t\t\t\t},\n';
	contents += '\t\t\t\tonEnter: redirectUserToLogin\n';
	contents += '\t\t\t},\n';
	contents += '\t\t]\n';
	contents += '\t},\n';
	contents += '];\n';
	return contents;
};