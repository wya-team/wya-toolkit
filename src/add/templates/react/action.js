export const action = (opts = {}) => {
	const { name, action, pathArr, componentArr, obj } = opts;
	let actionType = componentArr.join('_').toUpperCase() + '_GET';
	let contents = '';
	contents += `/**\n`;
	contents += ` * 请注释模块内容\n`;
	contents += ` */\n`;
	contents += `export const ${actionType} = '${actionType}';\n`;
	return contents;
};
