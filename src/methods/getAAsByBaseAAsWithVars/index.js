const db = require('../../services/db');
const { getAAStateVars } = require('../getAaStateVars');


async function getStateVarsWithAA(aa) {
	return {
		aa,
		stateVars: await getAAStateVars(aa)
	};
} 
async function getAAsByBaseAAsWithVars(baseAAs) {
	if (!baseAAs || !Array.isArray(baseAAs)) {
		return {
			error: 'arg base_aas not found or not an array'
		};
	}
	
	if (baseAAs.length === 0) {
		return {};
	}
	
	
	const rows = await db.query('SELECT address, definition, unit, creation_date FROM aa_addresses WHERE base_aa IN(?)', [baseAAs]);
	const addresses = rows.map(row => row.address);
	const stateVarsResult = await Promise.all(addresses.map(address => getStateVarsWithAA(address)));
	const stateVarsByAA = {};
	
	for (const result of stateVarsResult) {
		stateVarsByAA[result.aa] = result.stateVars;
	}
	
	
	return rows.map(row => {
		return {
			address: row.address,
			definition: JSON.parse(row.definition),
			unit: row.unit,
			creation_date: row.creation_date,
			stateVars: stateVarsByAA[row.address],
		};
	});
}

module.exports = {
	getAAsByBaseAAsWithVars,
};
