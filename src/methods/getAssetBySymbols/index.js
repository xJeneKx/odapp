const { registry_address } = require('ocore/conf');
const kv = require('../../services/kv.js');
const assetBySymbolCache = require('../../cacheClasses/assetBySymbolCache');
const { parseStateVar } = require('../../services/stateVars');

async function getAssetBySymbols(symbols, registryAddress) {
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
	
	if (!registryAddress) {
		registryAddress = registry_address;
	}
	
	const keys = symbols.map(symbol => 'st\n' + registryAddress + '\n' + `s2a_${symbol}`);
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

module.exports = {
	getAssetBySymbols,
};
