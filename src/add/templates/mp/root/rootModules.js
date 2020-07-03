import { getNewContent } from '../utils/helper';

export const rootModules = (content, opts = {}) => {
	const { mutation, mutationWithPackage, humpMutation, pathArr, componentArr, obj } = opts;
	try {
		let importContent = `import ${humpMutation} from './${mutationWithPackage}/root';`;
		let injectContent = `	...${humpMutation}`;

		let importSplit = `\nexport default {\n`;
		let injectSplit = `\n};\n`;

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
