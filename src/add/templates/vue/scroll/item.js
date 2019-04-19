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
		contents += `<template>\n`;
		contents += `	<div>\n`;
		contents += `		<div>{{ it }}</div>\n`;
		contents += `		<div>占位</div>\n`;
		contents += `		<div>占位</div>\n`;
		contents += `		<div>占位</div>\n`;
		contents += `		<div>占位</div>\n`;
		contents += `		<div>占位</div>\n`;
		contents += `		<div>占位</div>\n`;
		contents += `		<div @click="handleInit">刷新</div>\n`;
		contents += `	</div>\n`;
		contents += `</template>\n`;
		contents += `\n`;
		contents += `<script>\n`;
		contents += `export default {\n`;
		contents += `	name: "${project}-item",\n`;
		contents += `	props: {\n`;
		contents += `		it: Object,\n`;
		contents += `	},\n`;
		contents += `	methods: {\n`;
		contents += `		handleInit() {\n`;
		contents += `			this.$store.commit('${pagingType}_INIT');\n`;
		contents += `		}\n`;
		contents += `	}\n`;
		contents += `};\n`;
		contents += `</script>\n`;
		return contents;
	} catch (e) {
		return content;
	}
};

