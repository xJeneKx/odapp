const { validateBody } = require('./validators.js');
const { getJoint } = require('./methods/getJoint');
const { getJoints } = require('./methods/getJoints');
const { getDefinition } = require('./methods/getDefinition');
const { getDefinitions } = require('./methods/getDefinitions');
const { getAAsByBaseAAs } = require('./methods/getAAsByBaseAAs');
const { getAAsByBaseAAsWithVars } = require('./methods/getAAsByBaseAAsWithVars');
const { getBalances } = require('./methods/getBalances');
const { getAasStateVars } = require('./methods/getAasStateVars');
const { getAAStateVars } = require('./methods/getAaStateVars');
const { getAAStateVar } = require('./methods/getAaStateVar');
const { getDataFeed } = require('./methods/getDataFeed');
const { getAssetMetadata } = require('./methods/getAssetMetadata');
const { getAssetsMetadata } = require('./methods/getAssetsMetadata');
const { getAssetBySymbol } = require('./methods/getAssetBySymbol');
const { getAssetBySymbols } = require('./methods/getAssetBySymbols');

module.exports = async function (body) {
	const validResult = validateBody(body);
	if (!validResult.isValid) {
		return {
			error: validResult.error
		};
	}
	
	switch (body.type) {
	case 'getJoint':
		return getJoint(body.unit);
	case 'getJoints':
		return getJoints(body.units);
	case 'getDefinition':
		return getDefinition(body.address);
	case 'getDefinitions':
		return getDefinitions(body.addresses);
	case 'getAAsByBaseAAs':
		return getAAsByBaseAAs(body.baseAAs);
	case 'getAAsByBaseAAsWithVars':
		return getAAsByBaseAAsWithVars(body.baseAAs);
	case 'getBalances':
		return getBalances(body.addresses);
	case 'getAAsStateVars':
		return getAasStateVars(body.aas, body.startsWith, body.endsWith);
	case 'getAAStateVars':
		return getAAStateVars(body.aa, body.startsWith, body.endsWith);
	case 'getAAStateVar':
		return getAAStateVar(body.aa, body.varName);
	case 'getDataFeed':
		return getDataFeed(body.params);
	case 'getAssetMetadata':
		return getAssetMetadata(body.asset);
	case 'getAssetsMetadata':
		return getAssetsMetadata(body.assets);
	case 'getAssetBySymbol':
		return getAssetBySymbol(body.symbol, body.registryAddress);
	case 'getAssetBySymbols':
		return getAssetBySymbols(body.symbols, body.registryAddress); 
	default:
		return {
			error: 'unknown type'
		};
	}
};