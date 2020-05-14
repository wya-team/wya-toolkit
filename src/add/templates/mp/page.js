export const page = (opts = {}) => {
	const { mutation, pathArr, project, obj, title } = opts;
	let extra = pathArr.slice(1).map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');
	let contents = '';

	contents += `<template>\n`;
	contents += `	<view>\n`;
	contents += `		__tpl__, ${pathArr.join('-')} ${title}\n`;
	contents += `	</view>\n`;
	contents += `</template>\n\n`;

	contents += `<script>\n`;
	contents += `import Page from '../../common/page';\n\n`;
	contents += `Page({\n`;
	contents += `	mapState(state) {\n`;
	contents += `		return {\n`;
	contents += `			...state.${mutation}${extra}\n`;
	contents += `		};\n`;
	contents += `	},\n`;
	contents += `	data: {\n`;
	contents += `	},\n`;
	contents += `	onShow() {\n`;
	contents += `	},\n`;
	contents += `	onLoad(options) {\n`;
	contents += `	},\n`;
	contents += `});\n`;
	contents += `</script>\n\n`;
	contents += `<style lang="scss">\n`;
	contents += `</style>\n\n`;
	contents += `<config>\n`;
	contents += `{\n`;
	contents += `	"navigationBarTitleText": "${title}",\n`;
	contents += `	"usingComponents": {}\n`;
	contents += `}\n`;
	contents += `</config>\n`;
	return contents;
};
