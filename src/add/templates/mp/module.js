import { getExtra, getMutationType } from './utils/helper';

export const module = (opts = {}) => {
	const { mutation, humpMutation, pathArr, packageName, project, obj } = opts;

	let extra = getExtra(pathArr);

	let contents = '';

	// contents += `// import * as types from '@mutations/${mutation}';\n\n`;
	contents += `const initialState = {\n`;
	contents += `	data: ''\n`;
	contents += `};\n\n`;
	contents += `const mutations = {\n`;
	contents += `	${getMutationType(pathArr, packageName)}_GET_SUCCESS(state, { data, param }) {\n`;
	contents += `		state.data = {\n`;
	contents += `			...data\n`;
	contents += `		};\n`;
	contents += `	}\n`;
	contents += `};\n\n`;
	contents += `export const ${humpMutation}${extra} = {\n`;
	contents += `	state: { ...initialState },\n`;
	contents += `	mutations,\n`;
	contents += `};\n`;

	return contents;
};
