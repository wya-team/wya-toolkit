export const container = (opts = {}) => {
	const { mutation, pathArr, project, obj, title } = opts;
	let contents = '';

	contents += `<template>\n`;
	contents += `	<set-title title="${title}">\n`;
	contents += `		<${project}-content />\n`;
	contents += `	</set-title>\n`;
	contents += `</template>\n\n`;

	contents += `<script>\n\n`;
	contents += `import Content from '@components/${pathArr[0]}/${pathArr.slice(1).join("-")}/content';\n\n`;
	contents += `export default {\n`;
	contents += `	name: '${project}-${pathArr.join("-")}',\n`;
	contents += `	components: {\n`;
	contents += `		'${project}-content': Content\n`;
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
	contents += `<style lang="scss">\n`;
	contents += `</style>\n`;
	return contents;
};
