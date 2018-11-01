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
	contents += `	}\n`;
	contents += `];\n`;
	return contents;
};
