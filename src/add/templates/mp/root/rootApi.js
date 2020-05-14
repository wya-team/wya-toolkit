import { getNewContent } from '../utils/helper';

export const rootApi = (content, opts = {}) => {
	const { mutation, pathArr, componentArr, obj } = opts;
	try {
		let extra = pathArr.slice(1).map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');
		let pathName = `${pathArr.slice(1).join('-')}`;
		let moduleName = `${mutation}${extra}`;

		let importContent = `import ${mutation} from './${mutation}';`;
		let injectContent = `	...${mutation}`;

		let importSplit = `\nconst API = {\n`;
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

