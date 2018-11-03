import { getNewContent } from '../utils/helper';

export const list = (content, opts = {}) => {
	const { mutation, pathArr, project, obj, pagingMode: mode, pagingType: type } = opts;
	let extra = pathArr.slice(1).map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');

	let mutationType = `${pathArr.join('_').toUpperCase()}`;
	let pagingType = mutationType;

	if (pathArr.includes('list') === false) {
		pagingType = mutationType + '_LIST';
	}

	try {
		let contents = '';
		switch (type) {
			case 'tabs':
				contents += `<template>\n`;
				contents += `	<i-tabs \n`;
				contents += `		:value="type" \n`;
				contents += `		:animated="false"\n`;
				contents += `		type="card" \n`;
				contents += `		style="margin-top: 20px"\n`;
				contents += `		@on-click="handleChange"\n`;
				contents += `	>\n`;
				contents += `		<i-tab-pane \n`;
				contents += `			v-for="(item) in tabs"\n`;
				contents += `			:key="item.value"\n`;
				contents += `			:label="item.label" \n`;
				contents += `			:name="item.value"\n`;
				contents += `		>\n`;
				contents += `			<vc-paging\n`;
				switch (mode) {
					case 'native':
					case 'table':
						contents += `				:columns="columns"\n`;
						break;
					default :
						
				}
				contents += `				:show="item.value == type" \n`;
				contents += `				:type="item.value"\n`;
				contents += `				:data-source="listInfo[item.value].data"\n`;
				contents += `				:total="listInfo[item.value].total"\n`;
				contents += `				:reset="listInfo[item.value].reset"\n`;
				contents += `				:current.sync="current[item.value]"\n`;
				contents += `				:history="true"\n`;
				contents += `				:load-data="loadData"\n`;
				contents += `				class="v-${pathArr.join('-')}-list"\n`;	
				contents += `				mode="${mode}"\n`;
				contents += `				@page-size-change="handleChangePageSize"\n`;
				switch (mode) {
					case 'table':
						contents += `			/>\n`;
						break;
					case 'piece':
						contents += `			>\n`;
						contents += `				<${project}-item \n`;
						contents += `					slot-scope="it"\n`;
						contents += `					v-bind="it"\n`;
						contents += `					class="_item"\n`;
						contents += `				/> \n`;
						contents += `			</vc-paging>\n`;
						break;
					case 'native':
						contents += `			>\n`;
						contents += `				<${project}-item slot-scope="it" v-bind="it" />\n`;
						contents += `			</vc-paging>\n`;
						break;
					default :
						
				}
				contents += `		</i-tab-pane>\n`;
				contents += `	</i-tabs>\n`;
				contents += `</template>\n`;
				break;	
			default :
				contents += `<template>\n`;
				contents += `	<vc-paging\n`;
				contents += `		ref="tableTarget"\n`;
				switch (mode) {
					case 'native':
					case 'table':
						contents += `		:columns="columns"\n`;
						break;
					default :
						
				}
				contents += `		:data-source="listInfo.data" \n`;
				contents += `		:total="listInfo.total"\n`;
				contents += `		:reset="listInfo.reset"\n`;
				contents += `		:history="true"\n`;
				contents += `		:load-data="loadData"\n`;
				contents += `		mode="${mode}"\n`;
				contents += `		class="g-m-t-20 v-${pathArr.join('-')}-list"\n`;
				contents += `		@page-size-change="handleChangePageSize"\n`;
				switch (mode) {
					case 'table':
						contents += `	/>\n`;
						break;
					case 'piece':
						contents += `	>\n`;
						contents += `		<${project}-item \n`;
						contents += `			slot-scope="it"\n`;
						contents += `			v-bind="it"\n`;
						contents += `			class="_item"\n`;
						contents += `		/> \n`;
						contents += `	</vc-paging>\n`;
						break;
					case 'native':
						contents += `	>\n`;
						contents += `		<${project}-item slot-scope="it" v-bind="it" />\n`;
						contents += `	</vc-paging>\n`;
						break;
					default :
						
				}
				contents += `</template>\n`;
				break;
		}
		contents += `\n`;
		contents += `<script>\n`;
		switch (type) {
			case 'tabs':
				contents += `import { Tabs, TabPane } from 'iview';\n`;
				
				break;
			default :
				
		}
		contents += `import { Paging } from 'wya-vc';\n`;
		contents += `import { getParseUrl, getHashUrl } from '@utils/utils';\n`;
		contents += `import * as types from '@stores/mutations/${mutation}';\n`;
		contents += `// item\n`;

		switch (mode) {
			case 'table':
				contents += `import item from './item';\n`;
				break;
			default :
				contents += `import Item from './item';\n`;
				break;
		}
		
		contents += `\n`;
		contents += `export default {\n`;
		contents += `	name: '${project}-table',\n`;
		contents += `	components: {\n`;
		contents += `		'vc-paging': Paging,\n`;
		switch (type) {
			case 'tabs':
				contents += `		'i-tabs': Tabs,\n`;
				contents += `		'i-tab-pane': TabPane,\n`;
			default :
				
		}
		switch (mode) {
			case 'native':
			case 'piece':
				contents += `		'${project}-item': Item,\n`;
				break;
			default :
				
		}

		contents += `	},\n`;

		switch (mode) {
			case 'table':
				contents += `	mixins: [item],\n`;
				break;
			default :
				
		}
		
		contents += `	data() {\n`;
		contents += `		const { query } = this.$route;\n\n`;
		contents += `		return {\n`;
		switch (type) {
			case 'tabs':
				contents += `			type: String(query.type || "1"), // 同tabs下的value\n`;
				contents += `			current: {},\n`;
				contents += `			tabs: [\n`;
				contents += `				{ label: '标签一', value: '1' }, \n`;
				contents += `				{ label: '标签二', value: '2' }, \n`;
				contents += `				{ label: '标签三', value: '3' }\n`;
				contents += `			],\n`;
				break;
			default :
				
		}
		switch (mode) {
			case 'native':
				contents += `			columns: ['Header - 1', 'Header - 2', 'Header - 3', 'Header - 4'],\n`;
				break;
			default :
				
		}
		contents += `		};\n`;
		contents += `	},\n`;
		contents += `	computed: {\n`;
		contents += `		listInfo() {\n`;
		contents += `			return this.$store.state.${mutation}${extra}.listInfo;\n`;
		contents += `		}\n`;
		contents += `	},\n`;
		contents += `	methods: {\n`;
		contents += `		loadData(page, pageSize) {\n`;
		contents += `			const { query = {} } = this.$route;\n`;
		contents += `			return this.request({\n`;
		contents += `				url: types.${pagingType}_GET,\n`;
		contents += `				type: 'GET',\n`;
		contents += `				param: {\n`;
		contents += `					...query,\n`;
		switch (type) {
			case 'tabs':
				contents += `					type: this.type,\n`;
				break;
			default :
				
		}
		contents += `					page,\n`;
		contents += `					pageSize\n`;
		contents += `				},\n`;
		contents += `			}).then((res) => {\n`;
		contents += `				console.log(res, 'res');\n`;
		contents += `			}).catch((error) => {\n`;
		contents += `				console.log(error, 'error');\n`;
		contents += `			});\n`;
		contents += `		},\n`;
		switch (type) {
			case 'tabs':
				contents += `		handleChange(type) {\n`;
				contents += `			this.type = type;\n`;
				contents += `\n`;
				contents += `			let query = {\n`;
				contents += `				...this.$route.query,\n`;
				contents += `				type,\n`;
				contents += `				page: this.current[type]\n`;
				contents += `			};\n`;
				contents += `			this.$router.replace(getHashUrl('/${pathArr.join('/')}', { ...query }));\n`;
				contents += `		},\n`;
			default :
				
		}
		contents += `		handleChangePageSize() {\n`;
		contents += `			this.$store.commit('${pagingType}_INIT');\n`;
		contents += `		}\n`;
		contents += `	}\n`;
		contents += `};\n`;
		contents += `\n`;
		contents += `</script>\n`;
		contents += `\n`;
		contents += `<style lang="scss">\n`;
		switch (mode) {
			case 'piece':
				contents += `.v-${pathArr.join('-')}-list {\n`;
				contents += `	display: flex;\n`;
				contents += `	flex-wrap: wrap;\n`;
				contents += `	justify-content: space-between;\n`;
				contents += `	margin: 20px 0;\n`;
				contents += `	._item {\n`;
				contents += `		border: 1px solid #d4d4d4;\n`;
				contents += `		padding: 20px;\n`;
				contents += `		margin-bottom: 20px;\n`;
				contents += `		width: calc(50% - 10px);\n`;
				contents += `	}\n`;
				contents += `}\n`;
				break;
			case 'native':
				contents += `.v-${pathArr.join('-')}-list table {\n`;
				contents += `	width: 100%;\n`;
				contents += `	thead {\n`;
				contents += `		th {\n`;
				contents += `			text-align: left;\n`;
				contents += `			height: 40px;\n`;
				contents += `			white-space: nowrap;\n`;
				contents += `			overflow: hidden;\n`;
				contents += `			background-color: #f8f8f9;\n`;
				contents += `\n`;
				contents += `		}\n`;
				contents += `	}\n`;
				contents += `	tbody {\n`;
				contents += `		background-color: #ffffff;\n`;
				contents += `		td {\n`;
				contents += `			text-align: left;\n`;
				contents += `			height: 40px;\n`;
				contents += `			white-space: nowrap;\n`;
				contents += `			overflow: hidden;\n`;
				contents += `			border: 1px solid #ccc!important\n`;
				contents += `		}\n`;
				contents += `		tr {\n`;
				contents += `			border: 1px solid red!important\n`;
				contents += `		}\n`;
				contents += `	}\n`;
				contents += `}\n`;
				break;
			default :
				
		}
		contents += `\n`;
		contents += `</style>\n`;
		return contents;
	} catch (e) {
		console.log(e);
		return content;
	}
};

