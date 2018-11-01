import { getNewContent } from '../utils/helper';

export const rootRoute = (content, opts = {}) => {
	const { name, mutation, pathArr, componentArr, obj } = opts;
	try {
		let importContent = `import { ${mutation}Config } from '../containers/${mutation}/app';`;
		let injectContent = `				...${mutation}Config`;

		let importSplit = `\nexport const routeConfig = {\n`;
		let injectSplit = `\n			]\n		},\n`;

		return getNewContent({
			content,
			importContent,
			injectContent,
			importSplit,
			injectSplit
		});
	} catch (e) {
		return content;
	}
	
};
