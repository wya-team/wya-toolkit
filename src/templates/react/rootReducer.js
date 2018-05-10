export const rootReducer = (name, action, opts = {}) => {
	const { pathArr, componentArr, obj } = opts;
	let data = `${action}${name[0].toUpperCase()}${name.slice(1)}`;
	let contents = '';
	contents += `import { ${data} } from './${name}';\n`;
	contents += `export default {\n`;
	contents += `	${data},\n`;
	contents += `};\n`;
	return contents;
};
