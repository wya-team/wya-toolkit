export const router = (opts = {}) => {
	const { name, mutation, pathArr, project, obj } = opts;
	let contents = '';

	contents += `export const ${mutation}Config = [\n`;
	contents += `	{\n`;
	contents += `		path: '/${mutation}',\n`;
	contents += `		redirect: '/${mutation}/main'\n`;
	contents += `	},\n`;

	contents += `	{\n`;
	contents += `		path: '${pathArr.join('/')}',\n`;
	contents += `		name: '${pathArr.join('-')}',\n`;
	contents += `		component: () => import('./modules/${pathArr.join('-')}.vue')\n`;
	contents += `	}`;
	contents += `\n];\n`;
	return contents;
};

export const routerOverride = (content, opts = {}) => {
	const { name, mutation, pathArr, project, obj } = opts;
	try {
		if (content.substr(-1) !== '\n') {
			content += '\n';
		}
		// 需要注入的参数
		let newContent = '';
		newContent += `	{\n`;
		newContent += `		path: '${pathArr.join('/')}',\n`;
		newContent += `		name: '${pathArr.join('-')}',\n`;
		newContent += `		component: () => import('./modules/${pathArr.join('-')}.vue')\n`;
		newContent += `	}`;

		let txtSplit = `\n];\n`;

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
