export const module = (opts = {}) => {
	const { mutation, pathArr, project, obj } = opts;

	let extra = pathArr.slice(1).map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');

	let contents = '';

	contents += `// import * as types from '@mutations/${mutation}';\n\n`;
	contents += `const initialState = {\n`;
	contents += `	data: ''\n`;
	contents += `};\n\n`;
	contents += `const mutations = {\n`;
	contents += `	${pathArr.join('_').toUpperCase()}_GET_SUCCESS(state, { data, param }) {\n`;
	contents += `		state.data = {\n`;
	contents += `			...data\n`;
	contents += `		};\n`;
	contents += `	}\n`;
	contents += `};\n\n`;
	contents += `export const ${mutation}${extra} = {\n`;
	contents += `	state: { ...initialState },\n`;
	contents += `	mutations,\n`;
	contents += `};\n`;

	return contents;
};
