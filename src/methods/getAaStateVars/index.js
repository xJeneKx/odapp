const storage = require('ocore/storage');

async function getAAStateVars(aa, startsWith, endsWith) {
	if (!aa) {
		return {
			error: 'arg aa not found'
		};
	}
	
	const vars = await storage.readAAStateVars(aa, startsWith || '', '', 0);
	
	if (Object.keys(vars).length === 0) {
		return {};
	}
	
	if (!endsWith) {
		return vars;
	}
	
	const result = {};
	
	for (const key in vars) {
		if (endsWith && key.endsWith(endsWith)) {
			result[key] = vars[key];
		}
	}
	
	return result;
}

module.exports = {
	getAAStateVars,
};
