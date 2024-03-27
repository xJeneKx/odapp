const db = require('../../services/db');
const { getJoints } = require('../getJoints');
const assetMetadataCache = require('../../cacheClasses/assetMetadata');

async function getAssetsMetadata(assets) {
	if (!assets || !Array.isArray(assets)) {
		return {
			error: 'arg assets not found or not an array'
		};
	}
	
	if (assets.length === 0) {
		return [];
	}
	
	const assetsInCache = {};
	assets = assets.filter(asset => {
		const inCache = assetMetadataCache.getValue(asset);
		if (inCache) {
			assetsInCache[asset] = inCache;
			return false;
		}
		
		return true;
	});
	
	if (assets.length === 0)
		return assetsInCache;
	
	
	const rows = await db.query('SELECT asset, metadata_unit, registry_address, suffix FROM asset_metadata WHERE asset IN (?)', [assets]);
	
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
