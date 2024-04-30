
function parseStateVar(type_and_value) {
	if (typeof type_and_value !== 'string')
		throw Error('bad type of value ' + type_and_value + ': ' + (typeof type_and_value));
	if (type_and_value[1] !== '\n')
		throw Error('bad value: ' + type_and_value);
	const type = type_and_value[0];
	const value = type_and_value.substring(2);
	if (type === 's')
		return value;
	else if (type === 'n')
		return parseFloat(value);
	else if (type === 'j')
		return JSON.parse(value);
	else
		throw Error('unknown type in ' + type_and_value);
}

function readAAStateVars(address, var_prefix_from, var_prefix_to, limit, handle) {
	if (arguments.length <= 2) {
		handle = var_prefix_from;
		var_prefix_from = '';
		var_prefix_to = '';
		limit = 0;
	}
	if (!handle)
		return new Promise(resolve => readAAStateVars(address, var_prefix_from, var_prefix_to, limit, resolve));
	const options = {};
	options.gte = 'st\n' + address + '\n' + var_prefix_from;
	options.lte = 'st\n' + address + '\n' + var_prefix_to + '\uFFFF';
	if (limit)
		options.limit = limit;
	
	const assignField = require('ocore/formula/common.js').assignField;
	const objStateVars = {};
	const handleData = function (data){
		assignField(objStateVars, data.key.slice(36), parseStateVar(data.value));
	};
	const kvStore = require('./kv.js');
	const stream = kvStore.createReadStream(options);
	stream.on('data', handleData)
		.on('end', function(){
			handle(objStateVars);
		})
		.on('error', function(error){
			throw Error('error from data stream: '+error);
		});
}

function readAAStateVar(address, var_name, handleResult) {
	if (!handleResult)
		return new Promise(resolve => readAAStateVar(address, var_name, resolve));
	const kvStore = require('./kv.js');
	kvStore.get('st\n' + address + '\n' + var_name, function (type_and_value) {
		if (type_and_value === undefined)
			return handleResult();
		handleResult(parseStateVar(type_and_value));
	});
}


module.exports = {
	parseStateVar,
	readAAStateVars,
	readAAStateVar,
};
