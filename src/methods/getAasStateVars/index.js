const { getAAStateVars } = require('../getAaStateVars');
const { isValidAddress } = require('ocore/validation_utils');


async function getStateVarsWithAA(aa, startsWith, endsWith) {
	return {
		aa,
		stateVars: await getAAStateVars(aa, startsWith, endsWith)
	};
} 
async function getAasStateVars(aas, startsWith, endsWith) {
	if (!aas || !Array.isArray(aas)) {
		return {
			error: 'arg aas not found or not an array'
		};
	}

	aas = aas.filter(aa => aa !== '');

	for (let i = 0; i < aas.length; i++) {
		if (!isValidAddress(aas[i])) {
			return {
				error: 'arg aas[' + i + '] "' + aas[i] + '" not a valid address'
			};
		}
	}
	
	if (aas.length === 0) {
		return {};
	}
	

	const stateVarsResult = await Promise.all(aas.map(address => getStateVarsWithAA(address, startsWith, endsWith)));
	const stateVarsByAA = {};
	
	for (const r of stateVarsResult) {
		stateVarsByAA[r.aa] = r.stateVars;
	}


	return stateVarsByAA;
}

module.exports = {
	getAasStateVars,
};
