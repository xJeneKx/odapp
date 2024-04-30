const { readAAStateVars } = require('../../services/stateVars');

async function getAAStateVars(aa, startsWith, endsWith) {
	if (!aa) {
		return {
			error: 'arg aa not found'
		};
	}
	
	const vars = await readAAStateVars(aa, startsWith || '', startsWith || '', 0);
	
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
