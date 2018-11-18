export const component = (opts = {}) => {
	const { name, action, pathArr, componentArr, obj } = opts;
	let actionType = componentArr.join('_').toUpperCase() + '_GET';
	let contents = '';
	contents += `import React, { Component } from 'react';\n`;
	contents += `import PropTypes from 'prop-types';\n\n`;
	contents += `class Tpl extends Component {\n`;
	contents += `	constructor(...params) {\n`;
	contents += `		super(...params);\n`;
	contents += `	}\n`;
	contents += `	render() {\n`;
	contents += `		return (\n`;
	contents += `			<div>\n`;
	contents += `				test\n`;
	contents += `			</div>\n`;
	contents += `		);\n`;
	contents += `	}\n`;
	contents += `};\n`;
	contents += `Tpl.propTypes = {\n`;
	contents += `};\n`;
	contents += `export default Tpl;\n`;
	return contents;
};
