import { getNewContent } from './utils/helper';

export const router = (opts = {}) => {
	const { mutation, pathArr, project, obj, title, extra, route, components } = opts;
	let contents = '';

	contents += `export const ${mutation}Config = [\n`;
	contents += `	{\n`;
	contents += `		path: '/${mutation}',\n`;
	contents += `		redirect: '/${mutation}/main'\n`;
	contents += `	},\n`;

	contents += `	{\n`;
	contents += `		path: '${route}${extra || ''}',\n`;
	contents += `		name: '${pathArr.join('-')}',\n`;
	contents += `		meta: { title: '${title}' },\n`;
	if (components) {
		contents += `		components: [\n`;
		contents += `			() => import('./modules/${pathArr.join('-')}.vue'),\n`;
		components[1] && (contents += `			"${components[1]}",\n`);
		components[2] && (contents += `			"${components[2]}"\n`);
		contents += `		]\n`;
	} else {
		contents += `		component: () => import('./modules/${pathArr.join('-')}.vue')\n`;
	}
	contents += `	}`;
	contents += `\n];\n`;
	return contents;
};

export const routerOverride = (content, opts = {}) => {
	const { mutation, pathArr, project, obj, title, extra, route, components } = opts;
	const componentPath = `() => import('./modules/${pathArr.join('-')}.vue')`;
	try {
		let importContent = undefined;
		let injectContent = '';
		injectContent += `	{\n`;
		injectContent += `		path: '${route}${extra || ''}',\n`;
		injectContent += `		name: '${pathArr.join('-')}',\n`;
		injectContent += `		meta: { title: '${title}' },\n`;
		if (components) {
			injectContent += `		components: [\n`;
			injectContent += `			() => import('./modules/${pathArr.join('-')}.vue'),\n`;
			components[1] && (injectContent += `			"${components[1]}",\n`);
			components[2] && (injectContent += `			"${components[2]}"\n`);
			injectContent += `		]\n`;
		} else {
			injectContent += `		component: () => import('./modules/${pathArr.join('-')}.vue')\n`;
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
