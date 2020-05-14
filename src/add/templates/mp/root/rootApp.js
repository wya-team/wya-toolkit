import fs, { writeFile } from 'fs-extra';
import { resolve, join } from 'path';

export const rootApp = (content, opts = {}) => {
	const { mutation, pathArr, project, obj, route } = opts;

	const config = JSON.parse(content);
	const pages = config.pages || [];
	const page = `pages${route}`;
	const isExist = pages.some((it) => it === page);
	if (!isExist) {
		config.pages.push(page);
	} 
	return JSON.stringify(config, null, "\t");
};

