import { getNewContent } from '../utils/helper';

export const filter = (content, opts = {}) => {
	const { mutation, pathArr, project, obj, pagingMode: mode } = opts;
	let extra = pathArr.slice(1).map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');

	let mutationType = `${pathArr.join('_').toUpperCase()}`;
	let pagingType = mutationType;

	if (pathArr.includes('list') === false) {
		pagingType = mutationType + '_LIST';
	}

	try {
		let contents = '';
		contents += `<template>\n`;
		contents += `	<div>\n`;
		contents += `		<div>\n`;
		contents += `			<i-input\n`;
		contents += `				v-model="keyword" \n`;
		contents += `				size="large" \n`;
		contents += `				placeholder="请输入关键字搜索" \n`;
		contents += `				style="width: 320px" \n`;
		contents += `			/>\n`;
		contents += `			<i-button \n`;
		contents += `				type="primary"\n`;
		contents += `				class="g-m-l-10"\n`;
		contents += `				@click="handleSearch"\n`;
		contents += `			>\n`;
		contents += `				搜索\n`;
		contents += `			</i-button>\n`;
		contents += `			<span \n`;
		contents += `				class="g-m-l-20 g-c-black-dark g-fs-12 g-pointer"\n`;
		contents += `				@click="handleToggle" \n`;
		contents += `			>\n`;
		contents += `				更多搜索条件\n`;
		contents += `				<i \n`;
		contents += `					:class="show ? 'icon-triangle-up' : 'icon-triangle-down'" \n`;
		contents += `					class="iconfont g-fs-12 g-c-black-dark"\n`;
		contents += `				/>\n`;
		contents += `			</span>\n`;
		contents += `		</div>\n`;
		contents += `		<vc-expand \n`;
		contents += `			ref="expand"\n`;
		contents += `			v-model="show"\n`;
		contents += `		>\n`;
		contents += `			<div class="g-m-t-10 g-bg-gray-mid g-pd-20">\n`;
		contents += `				<i-input\n`;
		contents += `					v-model="name" \n`;
		contents += `					size="large" \n`;
		contents += `					placeholder="请输入公司名称" \n`;
		contents += `					style="width: 220px" \n`;
		contents += `				/>\n`;
		contents += `			</div>\n`;
		contents += `		</vc-expand>\n`;
		contents += `	</div>\n`;
		contents += `</template>\n`;
		contents += `\n`;
		contents += `<script>\n`;
		contents += `import { Input, Button } from 'iview';\n`;
		contents += `import { Expand } from 'wya-vc';\n`;
		contents += `import { getParseUrl, getHashUrl } from '@utils/utils';\n`;
		contents += `\n`;
		contents += `export default {\n`;
		contents += `	name: '${project}-filter',\n`;
		contents += `	components: {\n`;
		contents += `		'i-input': Input,\n`;
		contents += `		'i-button': Button,\n`;
		contents += `		'vc-expand': Expand\n`;
		contents += `	},\n`;
		contents += `	data() {\n`;
		contents += `		const { query = {} } = this.$route;\n`;
		contents += `		return {\n`;
		contents += `			keyword: String(query.keyword || ''),\n`;
		contents += `			name: String(query.name || ''),\n`;
		contents += `			show: false\n`;
		contents += `		};\n`;
		contents += `	},\n`;
		contents += `	methods: {\n`;
		contents += `		handleSearch(event) {\n`;
		contents += `			this.$router.replace(getHashUrl(\n`;
		contents += `				'/${pathArr.join('/')}', \n`;
		contents += `				{ \n`;
		contents += `					...this.$route.query, \n`;
		contents += `					keyword: this.keyword,\n`;
		contents += `					name: this.name\n`;
		contents += `				}\n`;
		contents += `			));\n`;
		contents += `			this.$store.commit('${pagingType}_INIT');\n`;
		contents += `		},\n`;
		contents += `		handleToggle() {\n`;
		contents += `			this.$refs.expand.toggle();\n`;
		contents += `		}\n`;
		contents += `	}\n`;
		contents += `};\n`;
		contents += `\n`;
		contents += `</script>\n`;
		contents += `\n`;
		contents += `<style lang="scss" scoped>\n`;
		contents += `\n`;
		contents += `</style>\n`;

		return contents;
	} catch (e) {
		console.log(e);
		return content;
	}
};

