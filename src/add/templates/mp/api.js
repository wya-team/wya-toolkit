import { getNewContent, getMutationType } from './utils/helper';

export const api = (opts = {}) => {
	const { mutation, pathArr, project, obj } = opts;
	
	let contents = '';
	contents += `const api = {\n`;
	contents += `	/**\n`;
	contents += `	 * 请注释模块内容\n`;
	contents += `	 */\n`;
	contents += `	${getMutationType(pathArr)}_GET: ''`;
	contents += `\n};\n`;
	contents += `export default api;\n`;
	return contents;
};

export const apiOverride = (content, opts = {}) => {
	const { mutation, pathArr, project, obj } = opts;
	
	try {
		let importContent = undefined;
		let injectContent = `	${getMutationType(pathArr)}_GET: ''`;

		let importSplit = undefined;
		let injectSplit = `\n};\n`;

		return getNewContent({
			content,
			importContent,
			injectContent,
			importSplit,
			injectSplit
		});
	} catch (e) {
		console.log(e);
		return content;
	}
};

