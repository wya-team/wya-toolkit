export const rootRoute = (content, opts = {}) => {
	const { name, mutation, pathArr, componentArr, obj } = opts;
	try {
		if (content.substr(-1) !== '\n') {
			content += '\n';
		}


		let moduleContent = `import { ${mutation}Config } from '../containers/${mutation}/app';`;
		let txtSplit = `\nexport const routeConfig = {\n`;

		let _content = content.split(txtSplit);

		let before = _content[0];
		let after = _content[1];

		// import
		if (before && before.includes(moduleContent) === false) {
			before += `${moduleContent}\n`;
		}

		// 尾部
		if (after[0] && after[0].includes(mutation) === false) {
			// 待补充
		}

		// 返回
		return _content.slice(2).reduce((pre, cur) => pre + txtSplit + cur, before + txtSplit + after);
	} catch (e) {
		return content;
	}
	
};
