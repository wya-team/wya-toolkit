export const reducer = (name, action, opts = {}) => {
	const { pathArr, componentArr, obj } = opts;
	let contents = '';
	contents += `import * as types from '@constants/actions/${action}';\n`;
	contents += `const initialState = {\n`;
	contents += `	isFetching: 0, // 是否已经获取\n`;
	contents += `	didInvalidate: 1, // 是否失效\n`;
	contents += `};\n`;
	contents += `export const ${action}${name[0].toUpperCase()}${name.slice(1)} = (state = initialState, action) => {\n`;
	contents += `	switch (action.type) {\n`;
	contents += `		case types.${componentArr.join('_').toUpperCase()}_GET + '_SUCCESS':\n`;
	contents += `			return state;\n`;
	contents += `		default:\n`;
	contents += `			return state;\n`;
	contents += `	}\n`;
	contents += `};\n`;
	return contents;
};
