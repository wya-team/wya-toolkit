import { getNewContent, getExtra, getMutationType } from '../utils/helper';

export const module = (content, opts = {}) => {
	const { mutation, humpMutation, pathArr, packageName, project, obj, pagingType: type } = opts;
	try {
		let extra = getExtra(pathArr);
		let mutationType = `${getMutationType(pathArr, packageName)}`;
		let pagingType = mutationType;

		if (pathArr.includes('list') === false) {
			pagingType = mutationType + '_LIST';
		}

		let contents = '';

		contents += `import { initScroll } from '../../../utils/util';\n\n`;
		contents += `const initialState = {\n`;
		contents += `	listInfo: {\n`;
		switch (type) {
			case 'tabs':
				contents +=	`		'1': {\n`;
				contents +=	`			...initScroll\n`;
				contents +=	`		},\n`;
				contents +=	`		'2': {\n`;
				contents +=	`			...initScroll\n`;
				contents +=	`		},\n`;
				contents +=	`		'3': {\n`;
				contents +=	`			...initScroll\n`;
				contents +=	`		},\n`;
				break;
			default :
				contents += `		...initScroll\n`;
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
				contents += `				...data.page,\n`;
				contents += `				data: [\n`;
				contents += `					...state.listInfo[type].data,\n`;
				contents += `					...data.list\n`;
				contents += `				]\n`;
				contents += `			}\n`;
				break;
			default :
				contents += `			...data.page,\n`;
				contents += `			data: [\n`;
				contents += `				...state.listInfo.data,\n`;
				contents += `				...data.list\n`;
				contents += `			]\n`;
				break;
		}
		contents += `		};\n`;
		contents += `	},\n`;
		contents += `	${pagingType}_GET_REFRESH(state, { data, param: { type, page } }) {\n`;
		contents += `		state.listInfo = {\n`;
		contents += `			...state.listInfo,\n`;
		switch (type) {
			case 'tabs':
				contents += `			[type]: {\n`;
				contents += `				...state.listInfo[type],\n`;
				contents += `				...data.page,\n`;
				contents += `				data: [\n`;
				contents += `					...data.list\n`;
				contents += `				]\n`;
				contents += `			}\n`;
				break;
			default :
				contents += `			...data.page,\n`;
				contents += `			data: [\n`;
				contents += `				...data.list\n`;
				contents += `			]\n`;
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
		contents += `export const ${humpMutation}${extra} = {\n`;
		contents += `	state: { ...initialState },\n`;
		contents += `	mutations,\n`;
		contents += `};\n`;
		return contents;
	} catch (e) {
		console.log(e);
		return content;
	}
};

