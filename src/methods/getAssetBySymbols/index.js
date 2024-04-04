const { registry_address } = require('ocore/conf');
const kv = require('../../services/kv.js');
const assetBySymbolCache = require('../../cacheClasses/assetBySymbolCache');

async function getAssetBySymbols(symbols) {
	if (!symbols || !Array.isArray(symbols)) {
		return {
			error: 'arg symbols not found or not an array'
		};
	}

	symbols = symbols.filter(symbol => symbol !== '');
	
	if (symbols.length === 0) {
		return {};
	}

	symbols = [...new Set(symbols)];
	
	const symbolsInCache = {};
	symbols = symbols.filter(symbol => {
		const inCache = assetBySymbolCache.getValue(symbol);
		if (inCache) {
			symbolsInCache[symbol] = inCache;
			return false;
		}
		
		if (['GBYTE', 'BYTES', 'BASE'].includes(symbol.toUpperCase())) {
			symbolsInCache[symbol] = 'base';
			return false;
		}
		
		return true;
	});
	
	if (symbols.length === 0) {
		return symbolsInCache;
	}
	
	const keys = symbols.map(symbol => 'st\n' + registry_address + '\n' + `s2a_${symbol}`);
	const assetsFromKV = await kv.getMany(keys);
	const result = {};
	assetsFromKV.forEach((asset, i) => {
		const k = symbols[i];
		const _asset = parseStateVar(asset);
		assetBySymbolCache.setValue(k, _asset);
		result[k] = _asset;
	});
	
	return { ...symbolsInCache, ...result };
}

function parseStateVar(type_and_value) {
	if (typeof type_and_value !== 'string')
		throw Error('bad type of value ' + type_and_value + ': ' + (typeof type_and_value));
	if (type_and_value[1] !== '\n')
		throw Error('bad value: ' + type_and_value);
	var type = type_and_value[0];
	var value = type_and_value.substr(2);
	if (type === 's')
		return value;
	else if (type === 'n')
		return parseFloat(value);
	else if (type === 'j')
		return JSON.parse(value);
	else
		throw Error('unknown type in ' + type_and_value);
}

module.exports = {
	getAssetBySymbols,
};
