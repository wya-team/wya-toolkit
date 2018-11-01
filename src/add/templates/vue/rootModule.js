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
	const { name, mutation, pathArr, componentArr, obj } = opts;
	try {
		if (content.substr(-1) !== '\n') {
			content += '\n';
		}

		let extra = pathArr.slice(1).map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');
		let pathName = `${pathArr.slice(1).join('-')}`;
		let moduleName = `${mutation}${extra}`;

		let moduleContent = `import { ${moduleName} } from './${pathName}';`;
		let beforeSplit = `\nexport default {\n`;
		let afterSplit = `\n};\n`;

		let _content = content.split(beforeSplit);

		let before = _content[0];
		let after = _content[1];

		// import
		if (before && before.includes(moduleContent) === false) {
			before += `${moduleContent}\n`;
		}

		// 尾部
		let _after = after.split(afterSplit);
		if (_after[0] && _after[0].includes(moduleName) === false) {
			let tag = '';
			if (_after[0].substr(-1) === ',') {
				tag = `\n`;
			} else if (_after[0].substr(-2) === ',\n') {
				tag = '';
			} else {
				tag = ",\n";
			}
			_after[0] += `${tag}	${moduleName}`;
		}
		after = _after.slice(1).reduce((pre, cur) => pre + afterSplit + cur, _after[0]);

		// 返回
		return _content.slice(2).reduce((pre, cur) => pre + beforeSplit + cur, before + beforeSplit + after);
	} catch (e) {
		return content;
	}
};
