'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var component = exports.component = function component() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var name = opts.name,
	    action = opts.action,
	    pathArr = opts.pathArr,
	    componentArr = opts.componentArr,
	    obj = opts.obj;

	var actionType = componentArr.join('_').toUpperCase() + '_GET';
	var contents = '';
	contents += 'import React, { Component } from \'react\';\n';
	contents += 'import PropTypes from \'prop-types\';\n\n';
	contents += 'class Tpl extends Component {\n';
	contents += '\tconstructor(...params) {\n';
	contents += '\t\tsuper(...params);\n';
	contents += '\t}\n';
	contents += '\trender() {\n';
	contents += '\t\treturn (\n';
	contents += '\t\t\t<div>\n';
	contents += '\t\t\t\ttest\n';
	contents += '\t\t\t</div>\n';
	contents += '\t\t);\n';
	contents += '\t}\n';
	contents += '};\n';
	contents += 'Tpl.propTypes = {\n';
	contents += '};\n';
	contents += 'export default Tpl;\n';
	return contents;
};