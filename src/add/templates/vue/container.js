export const container = (opts = {}) => {
	const { name, mutation, pathArr, project, obj } = opts;
	let contents = '';

	contents += `<template>\n`;
	contents += `	<set-title title="${pathArr.join("-")}">\n`;
	contents += `		<${project}-tpl />\n`;
	contents += `	</set-title>\n`;
	contents += `</template>\n\n`;

	contents += `<script>\n\n`;
	contents += `import Tpl from '@components/${pathArr[0]}/${pathArr.slice(1).join("-")}/__tpl__';\n\n`;
	contents += `export default {\n`;
	contents += `	name: '${project}-${pathArr.join("-")}',\n`;
	contents += `	components: {\n`;
	contents += `		'${project}-tpl': Tpl\n`;
	contents += `	},\n`;
	contents += `	data() {\n`;
	contents += `		return {\n`;
	contents += `		};\n`;
	contents += `	created() {\n`;
	contents += `	},\n`;
	contents += `	methods: {\n`;
	contents += `	},\n`;
	contents += `};\n`;
	contents += `</script>\n\n`;
	contents += `<style lang="scss" scoped>\n`;
	contents += `</style>\n`;
	return contents;
};
