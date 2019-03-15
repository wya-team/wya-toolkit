import { getNewContent } from './utils/helper';

export const router = (opts = {}) => {
	const { mutation, pathArr, project, obj, title, extra } = opts;
	let contents = '';

	contents += `export const ${mutation}Config = [\n`;
	contents += `	{\n`;
	contents += `		path: '/${mutation}',\n`;
	contents += `		redirect: '/${mutation}/main'\n`;
	contents += `	},\n`;

	contents += `	{\n`;
	contents += `		path: '/${pathArr.join('/')}${extra || ''}',\n`;
	contents += `		name: '${pathArr.join('-')}',\n`;
	contents += `		meta: { title: '${title}' },\n`;
	contents += `		component: () => import('./modules/${pathArr.join('-')}.vue')\n`;
	contents += `	}`;
	contents += `\n];\n`;
	return contents;
};

export const routerOverride = (content, opts = {}) => {
	const { mutation, pathArr, project, obj, title, extra } = opts;
	try {
		let importContent = undefined;
		let injectContent = '';
		injectContent += `	{\n`;
		injectContent += `		path: '/${pathArr.join('/')}',\n`;
		injectContent += `		name: '${pathArr.join('-')}',\n`;
		injectContent += `		meta: { title: '${title}' },\n`;
		injectContent += `		component: () => import('./modules/${pathArr.join('-')}.vue')\n`;
		injectContent += `	}`;

		let importSplit = undefined;
		let injectSplit = `\n];\n`;

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
