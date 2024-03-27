const db = require('../../services/db');

async function getAAsByBaseAAs(baseAAs) {
	if (!baseAAs || !Array.isArray(baseAAs)) {
		return {
			error: 'arg base_aas not found or not an array'
		};
	}
	
	if (baseAAs.length === 0) {
		return {};
	}
	
	
	const rows = await db.query('SELECT address, definition, unit, creation_date FROM aa_addresses WHERE base_aa IN(?)', [baseAAs]);
	
	return rows.map(row => {
		return {
			address: row.address,
			definition: JSON.parse(row.definition),
			unit: row.unit,
			creation_date: row.creation_date
		};
	});
}

module.exports = {
	getAAsByBaseAAs,
};
