export const rootModule = (opts = {}) => {
	const { name, mutation, pathArr, componentArr, obj } = opts;
	let extra = pathArr.slice(1).map(item => `${item[0].toUpperCase()}${item.slice(1)}`);
	let data = `${mutation}${extra}`;
	
	let contents = '';
	contents += `import { ${data} } from './${extra}';\n\n`;
	contents += `export default {\n`;
	contents += `	${data},\n`;
	contents += `};\n`;
	return contents;
};
