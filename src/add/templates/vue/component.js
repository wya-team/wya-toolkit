export const component = (opts = {}) => {
	const { name, mutation, pathArr, project, obj } = opts;
	let contents = '';

	contents += `<template>\n`;
	contents += `	<div>\n`;
	contents += `		__tpl__\n`;
	contents += `	</div>\n`;
	contents += `</template>\n\n`;

	contents += `<script>\n\n`;
	contents += `export default {\n`;
	contents += `	name: '${project}-tpl',\n`;
	contents += `	components: {\n`;
	contents += `	},\n`;
	contents += `	data() {\n`;
	contents += `		return {\n`;
	contents += `		};\n`;
	contents += `	},\n`;
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
