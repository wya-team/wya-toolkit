import { getMutationType } from './utils/helper';

export const mutation = (opts = {}) => {
	const { pathArr, obj } = opts;
	let mutationType = getMutationType(pathArr) + '_GET';
	let contents = '';
	contents += `/**\n`;
	contents += ` * 请注释模块内容\n`;
	contents += ` */\n`;
	contents += `export const ${mutationType} = '${mutationType}';\n`;
	return contents;
};

export const mutationOverride = (content, opts = {}) => {
	const { pathArr, obj } = opts;
	let mutationType = getMutationType(pathArr) + '_GET';
	let newContent = '';
	newContent += `export const ${mutationType} = '${mutationType}';`;

	if (content.includes(newContent) === false) {
		content += `${newContent}\n`;
	}

	return content;
};

