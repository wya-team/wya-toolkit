export const mutation = (opts = {}) => {
	const { name, pathArr, obj } = opts;
	let mutationType = pathArr.join('_').toUpperCase() + '_GET';
	let contents = '';
	contents += `/**\n`;
	contents += ` * 请注释模块内容\n`;
	contents += ` */\n`;
	contents += `export const ${mutationType} = '${mutationType}';\n`;
	return contents;
};
