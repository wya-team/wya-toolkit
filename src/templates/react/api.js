export const api = (name, action, opts = {}) => {
	const { pathArr, componentArr, obj } = opts;
	let contents = '';
	contents += `const api = {\n`;
	contents += `	/**\n`;
	contents += `	 * 请注释模块内容\n`;
	contents += `	 */\n`;
	contents += `	${componentArr.join('_').toUpperCase()}_GET: ''\n`;
	contents += `};\n`;
	contents += `export default api;\n`;
	return contents;
};
