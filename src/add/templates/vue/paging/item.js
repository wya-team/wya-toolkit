import { getNewContent } from '../utils/helper';

export const item = (content, opts = {}) => {
	const { mutation, pathArr, project, obj, pagingMode: mode } = opts;
	let extra = pathArr.slice(1).map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');

	let mutationType = `${pathArr.join('_').toUpperCase()}`;
	let pagingType = mutationType;

	if (pathArr.includes('list') === false) {
		pagingType = mutationType + '_LIST';
	}

	let contents = '';
	try {
		switch (mode) {
			case 'table':
				contents += `<template>\n`;
				contents += `	<vc-table-item>\n`;
				contents += `		<vc-table-column\n`;
				contents += `			prop="orders_id"\n`;
				contents += `			label="ID"\n`;
				contents += `			width="180"\n`;
				contents += `		/>\n`;
				contents += `		<vc-table-column\n`;
				contents += `			prop="orders_sn"\n`;
				contents += `			label="信息"\n`;
				contents += `			width="180"\n`;
				contents += `		/>\n`;
				contents += `		<vc-table-column\n`;
				contents += `			prop="address"\n`;
				contents += `			label="地址"\n`;
				contents += `		>\n`;
				contents += `			<div @click="handleResetFirst">回到首页刷新</div>\n`;
				contents += `			<div @click="handleResetCur">当前页刷新</div>\n`;
				contents += `		</vc-table-column>\n`;
				contents += `	</vc-table-item>\n`;
				contents += `</template>\n`;
				contents += `\n`;
				contents += `<script>\n`;
				contents += `export default {\n`;
				contents += `	name: 'v-tpl-item',\n`;
				contents += `	components: {\n`;
				contents += `\n`;
				contents += `	},\n`;
				contents += `	props: {\n`;
				contents += `\n`;
				contents += `	},\n`;
				contents += `	data() {\n`;
				contents += `		return {\n`;
				contents += `		};\n`;
				contents += `	},\n`;
				contents += `	computed: {\n`;
				contents += `\n`;
				contents += `	},\n`;
				contents += `	watch: {\n`;
				contents += `		\n`;
				contents += `	},\n`;
				contents += `	created() {\n`;
				contents += `		\n`;
				contents += `	},\n`;
				contents += `	methods: {\n`;
				contents += `		handleResetFirst() {\n`;
				contents += `			this.$store.commit('${pagingType}_INIT');\n`;
				contents += `		},\n`;
				contents += `		handleResetCur() {\n`;
				contents += `			this.$store.commit('${pagingType}_RESET', { type: this.type });\n`;
				contents += `		},\n`;
				contents += `	},\n`;
				contents += `};\n`;
				contents += `</script>\n`;
				contents += `\n`;
				contents += `<style lang="scss">\n`;
				contents += `</style>\n`;
				contents += `\n`;
				break;
			case 'piece':
				contents += `<template>\n`;
				contents += `	<div :key="id">\n`;
				contents += `		<div>{{ name }}</div>\n`;
				contents += `		<div @click="handleResetFirst">回到首页刷新</div>\n`;
				contents += `		<div @click="handleResetCur">当前页刷新</div>\n`;
				contents += `	</div>\n`;
				contents += `</template>\n`;
				contents += `\n`;
				contents += `<script>\n`;
				contents += `export default {\n`;
				contents += `	name: "${project}-item",\n`;
				contents += `	props: {\n`;
				contents += `		id: [String, Number],\n`;
				contents += `		name: String\n`;
				contents += `	},\n`;
				contents += `	methods: {\n`;
				contents += `		handleResetFirst() {\n`;
				contents += `			this.$store.commit('${pagingType}_INIT');\n`;
				contents += `		},\n`;
				contents += `		handleResetCur() {\n`;
				contents += `			this.$store.commit('${pagingType}_RESET', { type: this.type });\n`;
				contents += `		}\n`;
				contents += `	}\n`;
				contents += `};\n`;
				contents += `</script>\n`;
				break;
			case 'native':
				contents += `<template>\n`;
				contents += `	<tbody>\n`;
				contents += `		<template v-for="item in data">\n`;
				contents += `			<vc-fragment :key="item.id">\n`;
				contents += `				<tr>\n`;
				contents += `					<td colspan="4">\n`;
				contents += `						{{ item.name }}\n`;
				contents += `					</td>\n`;
				contents += `				</tr>\n`;
				contents += `				<tr>\n`;
				contents += `					<td>\n`;
				contents += `						<div class="_table-cell">\n`;
				contents += `							111\n`;
				contents += `						</div>\n`;
				contents += `					</td>\n`;
				contents += `					<td rowspan="2">\n`;
				contents += `						<div class="_table-cell">\n`;
				contents += `							222\n`;
				contents += `						</div>\n`;
				contents += `					</td>\n`;
				contents += `					<td>\n`;
				contents += `						<div class="_table-cell">\n`;
				contents += `							333\n`;
				contents += `						</div>\n`;
				contents += `					</td>\n`;
				contents += `					<td rowspan="2">\n`;
				contents += `						<div class="_table-cell">\n`;
				contents += `							444\n`;
				contents += `						</div>\n`;
				contents += `					</td>\n`;
				contents += `				</tr>\n`;
				contents += `				<tr >\n`;
				contents += `					<td>\n`;
				contents += `						<div class="_table-cell" @click="handleResetFirst">\n`;
				contents += `							回到首页刷新\n`;
				contents += `						</div>\n`;
				contents += `					</td>\n`;
				contents += `					<td>\n`;
				contents += `						<div class="_table-cell" @click="handleResetCur">\n`;
				contents += `							当前页刷新\n`;
				contents += `						</div>\n`;
				contents += `					</td>\n`;
				contents += `				</tr>\n`;
				contents += `			</vc-fragment>\n`;
				contents += `		</template>\n`;
				contents += `	</tbody>\n`;
				contents += `</template>\n`;
				contents += `<script>\n`;
				contents += `import { Fragment } from 'wya-vc';\n`;
				contents += `\n`;
				contents += `export default {\n`;
				contents += `	name: '${project}-item',\n`;
				contents += `	components: {\n`;
				contents += `		'vc-fragment': Fragment\n`;
				contents += `	},\n`;
				contents += `	props: {\n`;
				contents += `		it: [Object, Array],\n`;
				contents += `		data: {\n`;
				contents += `			type: Array,\n`;
				contents += `			default: () => ([])\n`;
				contents += `		},\n`;
				contents += `	},\n`;
				contents += `	created() {\n`;
				contents += `	},\n`;
				contents += `	methods: {\n`;
				contents += `		handleResetFirst() {\n`;
				contents += `			this.$store.commit('${pagingType}_INIT');\n`;
				contents += `		},\n`;
				contents += `		handleResetCur() {\n`;
				contents += `			this.$store.commit('${pagingType}_RESET', { type: this.type });\n`;
				contents += `		},\n`;
				contents += `		handleLinkTo() {\n`;
				contents += `			this.$router.push('/');\n`;
				contents += `		},\n`;
				contents += `	}\n`;
				contents += `};\n`;
				contents += `</script>\n`;
				break;
			default :
				
		}
		return contents;
	} catch (e) {
		return content;
	}
};

