function validateBody(body) {
	if (typeof body !== 'object') {
		return {
			error: 'request type not valid, please send an object',
			isValid: false
		};
	}
	
	if (!body.type) {
		return {
			error: 'type field not found, please add a type field',
			isValid: false
		};
	}
	
	return {
		isValid: true
	};
}


module.exports = {
	validateBody,
};
