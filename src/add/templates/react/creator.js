export const creator = (opts = {}) => {
	const { name, action, pathArr, componentArr, obj } = opts;
	let contents = '';
	contents += `import * as types from '@constants/actions/${action}';\n`;
	contents += `/**\n`;
	contents += ` * 引入共用的action\n`;
	contents += ` * navigator, request, emit \n`;
	contents += ` */\n`;
	contents += `export { navigator } from './_common/navigator';\n`;
	contents += `export { request } from './_common/request';\n`;
	contents += `export { emit } from './_common/emit';\n`;
	return contents;
};
