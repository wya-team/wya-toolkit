export const rootModule = (opts = {}) => {
	const { name, mutation, pathArr, componentArr, obj } = opts;
	let data = `${mutation}${name[0].toUpperCase()}${name.slice(1)}`;
	let contents = '';
	contents += `import { ${data} } from './${name}';\n`;
	contents += `export default {\n`;
	contents += `	${data},\n`;
	contents += `};\n`;
	return contents;
};
