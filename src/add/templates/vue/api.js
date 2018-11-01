export const api = (opts = {}) => {
	const { name, mutation, pathArr, project, obj } = opts;
	
	let contents = '';
	contents += `const api = {\n`;
	contents += `	/**\n`;
	contents += `	 * 请注释模块内容\n`;
	contents += `	 */\n`;
	contents += `	${pathArr.join('_').toUpperCase()}_GET: ''\n`;
	contents += `};\n`;
	contents += `export default api;\n`;
	return contents;
};
