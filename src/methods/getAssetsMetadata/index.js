const conf = require('ocore/conf');
const { isStringOfLength } = require('ocore/validation_utils');
const constants = require('ocore/constants');
const db = require('../../services/db');
const { getJoints } = require('../getJoints');
const assetMetadataCache = require('../../cacheClasses/assetMetadata');
const { getAssetsMetadataFromMemory } = require('../../services/assetMetadata');

async function getAssetsMetadata(assets) {
	if (!assets || !Array.isArray(assets)) {
		return {
			error: 'arg assets not found or not an array'
		};
	}

	assets = assets.filter(asset => asset !== '');
	
	if (assets.length === 0) {
		return [];
	}

	assets = [...new Set(assets)];
	
	const assetsInCache = {};
	assets = assets.filter(asset => {
		if (['base', 'gbyte', 'bytes'].includes(asset.toLowerCase())) {
			assetsInCache['base'] = {
				asset:	'base',
				decimals:9,
				name: 'GBYTE'
			};
			return false;
		}
		
		if (!isStringOfLength(asset, constants.HASH_LENGTH)) {
			return false;
		}
		
		if (!conf.useSQLiteForAssetMetadata) return true; // cache is not used in this case
		
		const inCache = assetMetadataCache.getValue(asset);
		if (inCache) {
			assetsInCache[asset] = inCache;
			return false;
		}
		
		return true;
	});
	
	if (assets.length === 0)
		return assetsInCache;
	
	
	if (!conf.useSQLiteForAssetMetadata) {
		const result = getAssetsMetadataFromMemory(assets);
		return result ? { ...assetsInCache, ...result } : assetsInCache;
	}
	
	const rows = await db.query(`SELECT asset, metadata_unit, registry_address, suffix FROM asset_metadata WHERE asset IN (${db.In(assets)})`, [assets]);
	
	
	if (rows.length === 0)
		return assetsInCache;
	
	const rowByUnit = {};
	
	for (const row of rows) {
		rowByUnit[row.metadata_unit] = row;
	}
	
	const joints = await getJoints(Object.keys(rowByUnit));
	
	const result = {};
	
	for (const joint of joints) {
		const metadata = joint.unit.messages.find(
			(item) => item.app === 'data'
		);
		const row = rowByUnit[joint.unit.unit];
		const tmpResult = { ...row, ...metadata.payload };
		result[row.asset] = tmpResult;
		assetMetadataCache.setValue(row.asset, tmpResult);
	}
	
	return { ...assetsInCache, ...result };
}

module.exports = {
	getAssetsMetadata,
};
