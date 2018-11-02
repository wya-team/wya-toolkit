import { getNewContent } from '../utils/helper';

export const module = (content, opts = {}) => {
	const { mutation, pathArr, project, obj } = opts;
	try {
		let extra = pathArr.slice(1).map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');
		let mutationType = `${pathArr.join('_').toUpperCase()}`;
		let pagingType = mutationType;

		if (pathArr.includes('list') === false) {
			pagingType = mutationType + '_LIST';
		}

		let contents = '';

		contents += `import { initPage } from '@utils/utils';\n\n`;
		contents += `const initialState = {\n`;
		contents += `	listInfo: {\n`;
		contents += `		...initPage\n`;
		contents += `	}\n`;
		contents += `};\n\n`;
		contents += `const mutations = {\n`;
		contents += `	${pagingType}_GET_SUCCESS(state, { data, param: { page } }) {\n`;
		contents += `		state.listInfo = {\n`;
		contents += `			...state.listInfo,\n`;
		contents += `			total: data.totalCount,\n`;
		contents += `			data: {\n`;
		contents += `				...state.listInfo.data,\n`;
		contents += `				[page]: data.list\n`;
		contents += `			}\n`;
		contents += `		};\n`;
		contents += `	},\n`;
		contents += `	${pagingType}_RESET(state, payload) {\n`;
		contents += `		state.listInfo = {\n`;
		contents += `			...initPage,\n`;
		contents += `			reset: true\n`;
		contents += `		};\n`;
		contents += `	},\n`;
		contents += `	${pagingType}_INIT(state, payload) {\n`;
		contents += `		state.listInfo = {\n`;
		contents += `			...initPage\n`;
		contents += `		};\n`;
		contents += `	},\n`;
		contents += `	${mutationType}_ROUTE_CHANGE(state, payload) {\n`;
		contents += `		state.listInfo = {\n`;
		contents += `			...initPage\n`;
		contents += `		};\n`;
		contents += `	},\n`;
		contents += `};\n\n`;
		contents += `export const ${mutation}${extra} = {\n`;
		contents += `	state: { ...initialState },\n`;
		contents += `	mutations,\n`;
		contents += `};\n`;
		return contents;
	} catch (e) {
		console.log(e);
		return content;
	}
};

