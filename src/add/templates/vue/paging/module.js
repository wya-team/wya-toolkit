import { getNewContent } from '../utils/helper';

export const module = (content, opts = {}) => {
	const { mutation, pathArr, project, obj, pagingType: type } = opts;
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
		switch (type) {
			case 'tabs':
				contents +=	`		'1': {\n`;
				contents +=	`			...initPage\n`;
				contents +=	`		},\n`;
				contents +=	`		'2': {\n`;
				contents +=	`			...initPage\n`;
				contents +=	`		},\n`;
				contents +=	`		'3': {\n`;
				contents +=	`			...initPage\n`;
				contents +=	`		},\n`;
				break;
			default :
				contents += `		...initPage\n`;
				break;
		}
		contents += `	}\n`;
		contents += `};\n\n`;
		contents += `const mutations = {\n`;
		contents += `	${pagingType}_GET_SUCCESS(state, { data, param: { type, page } }) {\n`;
		contents += `		state.listInfo = {\n`;
		contents += `			...state.listInfo,\n`;
		switch (type) {
			case 'tabs':
				contents += `			[type]: {\n`;
				contents += `				...state.listInfo[type],\n`;
				contents += `				total: data.totalCount,\n`;
				contents += `				data: {\n`;
				contents += `					...state.listInfo[type].data,\n`;
				contents += `					[page]: data.list\n`;
				contents += `				}\n`;
				contents += `			}\n`;
				break;
			default :
				contents += `			total: data.totalCount,\n`;
				contents += `			data: {\n`;
				contents += `				...state.listInfo.data,\n`;
				contents += `				[page]: data.list\n`;
				contents += `			}\n`;
				break;
		}
		contents += `		};\n`;
		contents += `	},\n`;
		contents += `	${pagingType}_RESET(state, { type }) {\n`;
		contents += `		state.listInfo = {\n`;
		contents += `			...initialState.listInfo,\n`;
		switch (type) {
			case 'tabs':
				contents += `			[type]: {\n`;
				contents += `				...initPage,\n`;
				contents += `				reset: true\n`;
				contents += `			}\n`;
				break;
			default :
				contents += `			reset: true\n`;
				break;
				
		}

		contents += `		};\n`;
		contents += `	},\n`;
		contents += `	${pagingType}_INIT(state, payload) {\n`;
		contents += `		state.listInfo = {\n`;
		contents += `			...initialState.listInfo\n`;
		contents += `		};\n`;
		contents += `	},\n`;
		contents += `	${mutationType}_ROUTE_CHANGE(state, payload) {\n`;
		contents += `		state.listInfo = {\n`;
		contents += `			...initialState.listInfo\n`;
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

