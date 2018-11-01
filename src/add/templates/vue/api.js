export const api = (opts = {}) => {
	const { name, mutation, pathArr, project, obj } = opts;
	
	let contents = '';
	contents += `const api = {\n`;
	contents += `	/**\n`;
	contents += `	 * 请注释模块内容\n`;
	contents += `	 */\n`;
	contents += `	${pathArr.join('_').toUpperCase()}_GET: ''`;
	contents += `\n};\n`;
	contents += `export default api;\n`;
	return contents;
};

export const apiOverride = (content, opts = {}) => {
	const { name, mutation, pathArr, project, obj } = opts;
	
	try {
		if (content.substr(-1) !== '\n') {
			content += '\n';
		}
		// 需要注入的参数
		let newContent = '';
		newContent += `	${pathArr.join('_').toUpperCase()}_GET: ''`;

		let txtSplit = `\n};\n`;

		let splitContent = content.split(txtSplit);

		if (splitContent[0] && splitContent[0].includes(newContent) === false) {
			let tag = '';
			if (splitContent[0].substr(-1) === ',') {
				tag = `\n`;
			} else if (splitContent[0].substr(-2) === ',\n') {
				tag = '';
			} else {
				tag = ",\n";
			}
			splitContent[0] += `${tag}${newContent}`;
		}

		return splitContent.slice(1).reduce((pre, cur) => pre + txtSplit + cur, splitContent[0]);
	} catch (e) {
		return content;
	}
};

