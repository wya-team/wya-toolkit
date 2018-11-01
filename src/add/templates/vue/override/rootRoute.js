export const rootRoute = (content, opts = {}) => {
	const { name, mutation, pathArr, componentArr, obj } = opts;
	try {
		if (content.substr(-1) !== '\n') {
			content += '\n';
		}


		let moduleContent = `import { ${mutation}Config } from '../containers/${mutation}/app';`;
		let beforeSplit = `\nexport const routeConfig = {\n`;
		let afterSplit = `\n			]\n		},\n`;

		let _content = content.split(beforeSplit);

		let before = _content[0];
		let after = _content[1];

		// import
		if (before && before.includes(moduleContent) === false) {
			before += `${moduleContent}\n`;
		}

		// 尾部
		let _after = after.split(afterSplit);
		if (_after[0] && _after[0].includes(mutation) === false) {
			let tag = '';
			if (_after[0].substr(-1) === ',') {
				tag = `\n`;
			} else if (_after[0].substr(-2) === ',\n') {
				tag = '';
			} else {
				tag = ",\n";
			}
			_after[0] += `${tag}				...${mutation}Config`;
		}
		after = _after.slice(1).reduce((pre, cur) => pre + afterSplit + cur, _after[0]);
		// 返回
		return _content.slice(2).reduce((pre, cur) => pre + beforeSplit + cur, before + beforeSplit + after);
	} catch (e) {
		return content;
	}
	
};
