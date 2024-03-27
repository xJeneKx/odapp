const storage = require('ocore/storage');

async function getAAStateVar(aa, varName) {
	if (!aa) {
		return {
			error: 'arg aa not found'
		};
	}
	
	if (!varName) {
		return {
			error: 'arg varName not found'
		};
	}
	
	const _var = await storage.readAAStateVar(aa, varName);
	if (!_var) {
		return {
			error: 'var not found'
		};
	}
	
	return _var;
}


module.exports = {
	getAAStateVar,
};
