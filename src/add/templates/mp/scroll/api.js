import { getNewContent, getMutationType } from '../utils/helper';

export const api = (content, opts = {}) => {
	const { mutation, pathArr, project, obj } = opts;
	
	try {
		if (pathArr.includes('list') === false) {
			let importContent = undefined;
			let injectContent = `	${getMutationType(pathArr)}_LIST_GET: '/test'`;

			let importSplit = undefined;
			let injectSplit = `\n};\n`;

			return getNewContent({
				content,
				importContent,
				injectContent,
				importSplit,
				injectSplit
			});
		} else {
			return content;
		}
	} catch (e) {
		console.log(e);
		return content;
	}
};

