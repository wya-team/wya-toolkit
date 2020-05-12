import { getNewContent } from './utils/helper';

export const router = (opts = {}) => {
	const { mutation, pathArr, project, obj, title, extra, route, dynamic, components } = opts;
	let contents = '';
	const componentPath = `() => import('./modules/${pathArr.join('-')}.vue')\n`;

	contents += `export const ${mutation}Config = [\n`;
	contents += `	{\n`;
	contents += `		path: '/${mutation}',\n`;
	contents += `		redirect: '/${mutation}/main'\n`;
	contents += `	},\n`;

	contents += `	{\n`;
	contents += `		path: '${route}${extra || ''}',\n`;
	contents += `		name: '${pathArr.join('-')}',\n`;
	contents += `		meta: { title: '${title}' },\n`;
	if (dynamic && components) {
		components[0] = componentPath;
		contents += `		components: ${JSON.stringify(components, null, '\t')}\n`;
	} else {
		contents += `		component: ${componentPath}\n`;
	}
	contents += `	}`;
	contents += `\n];\n`;
	return contents;
};

export const routerOverride = (content, opts = {}) => {
	const { mutation, pathArr, project, obj, title, extra, route, dynamic, components } = opts;
	const componentPath = `() => import('./modules/${pathArr.join('-')}.vue')\n`;
	try {
		let importContent = undefined;
		let injectContent = '';
		injectContent += `	{\n`;
		injectContent += `		path: '${route}${extra || ''}',\n`;
		injectContent += `		name: '${pathArr.join('-')}',\n`;
		injectContent += `		meta: { title: '${title}' },\n`;
		if (dynamic && components) {
			components[0] = componentPath;
			injectContent += `		components: ${JSON.stringify(components, null, '\t')}\n`;
		} else {
			injectContent += `		component: ${componentPath}\n`;
		}
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
		console.log(e);
		return content;
	}
};
