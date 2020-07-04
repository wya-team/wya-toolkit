const CurrentGitBranch = require('current-git-branch');

const branchRegEx = /^((feature|feat|bug|bug-oa)-|(better|conflict))\d{0,7}/;
const excludeBranch = /^(master|pre-release|develop)/;

// TODO 通过 cosmiconfig 来获取package.json内的自定义配置项，来设置校验规则
module.exports = () => {
	const branchName = CurrentGitBranch();

	if (!branchRegEx.test(branchName) && !excludeBranch.test(branchName)) {
		console.error(
			`[@wya/toolkit]: Invalid Branch Name: "${branchName}".

			Examples: 

			- feature-123-[模块or描述]-[author]
			- bug-12345-[模块or描述]-[author]
			- better-xxx

			Allowed Branch Types:
			
			- feature
			- feat
			- bug
			- better
			- conflict
			`
		);
		process.exit(1);
	}
};