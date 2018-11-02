import { getNewContent } from '../utils/helper';

export const api = (content, opts = {}) => {
	const { mutation, pathArr, project, obj } = opts;
	
	try {
		if (pathArr.includes('list') === false) {
			let importContent = undefined;
			let injectContent = `	${pathArr.join('_').toUpperCase()}_LIST_GET: '/list'`;

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

