const storage = require('ocore/storage');

async function getAAStateVars(aa, startsWith, endsWith) {
	if (!aa) {
		return {
			error: 'arg aa not found'
		};
	}
	
	const vars = await storage.readAAStateVars(aa);
	
	if (Object.keys(vars).length === 0) {
		return {};
	}
	
	if (!startsWith && !endsWith) {
		return vars;
	}
	
	const result = {};
	for (const key in vars) {
		if (startsWith && endsWith && key.startsWith(startsWith) && key.endsWith(endsWith)) {
			result[key] = vars[key];
			continue;
		}
		
		if (startsWith && key.startsWith(startsWith)) {
			result[key] = vars[key];
			continue;
		}
		
		if (endsWith && key.endsWith(endsWith)) {
			result[key] = vars[key];
		}
	}
	
	return result;
}

module.exports = {
	getAAStateVars,
};
