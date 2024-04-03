const { readJoints } = require('./readJoints');

async function getJoints(units) {
	if (!units || !Array.isArray(units)) {
		return {
			error: 'arg units not found or not an array'
		};
	}

	units = units.filter(unit => unit !== '');

	if (units.length === 0) {
		return [];
	}
	
	return readJoints(units);
}

module.exports = {
	getJoints,
};
