import { getNewContent } from './utils/helper';

export const rootModule = (opts = {}) => {
	const { mutation, pathArr, componentArr, obj } = opts;

	let extra = pathArr.slice(1).map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');
	let pathName = `${pathArr.slice(1).join('-')}`;
	let moduleName = `${mutation}${extra}`;

	let contents = '';
	contents += `import { ${moduleName} } from './${pathName}';\n`;
	contents += `\nexport default {\n`;
	contents += `	${moduleName}`;
	contents += `\n};\n`;
	return contents;
};

export const rootModuleOverride = (content, opts = {}) => {
	const { mutation, pathArr, componentArr, obj } = opts;
	try {
		let extra = pathArr.slice(1).map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');
		let pathName = `${pathArr.slice(1).join('-')}`;
		let moduleName = `${mutation}${extra}`;
		
		let importContent = `import { ${moduleName} } from './${pathName}';`;
		let injectContent = `	${moduleName}`;

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
