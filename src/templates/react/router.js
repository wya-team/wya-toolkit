export const router = (name, action, opts = {}) => {
	const { pathArr, componentArr, obj } = opts;
	let contents = '';
	contents += `import { redirectUserToLogin, redirectUserToHome } from '@router/auth';\n`;
	contents += `export const ${action}Config = [\n`;
	contents += `	{\n`;
	contents += `		path: '/${action}',\n`;
	contents += `		childRoutes: [\n`;
	contents += `			{\n`;
	contents += `				path: '${pathArr.slice(1).join('/')}',\n`;
	contents += `				getComponent: (nextState, cb) => {\n`;
	contents += `					require.ensure([], (require) => {\n`;
	contents += `						cb(null, require('./Modules/${name}').default);\n`;
	contents += `					});\n`;
	contents += `				onEnter: redirectUserToHome\n`;
	contents += `			},\n`;
	contents += `		]\n`;
	contents += `	},\n`;
	contents += `];\n`;
	return contents;
};
