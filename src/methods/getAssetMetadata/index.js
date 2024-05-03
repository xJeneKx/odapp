const conf = require('ocore/conf');
const db = require('../../services/db');
const constants = require('ocore/constants.js');
const { isStringOfLength } = require('ocore/validation_utils');
const { getJoint } = require('../getJoint');
const assetMetadataCache = require('../../cacheClasses/assetMetadata');
const { getAssetMetadataFromMemory } = require('../../services/assetMetadata');

async function getAssetMetadata(asset) {
	if (!asset) {
		return {
			error: 'arg asset not found'
		};
	}
	
	if (!isStringOfLength(asset, constants.HASH_LENGTH)) {
		return {
			error: 'bad asset: '+asset
		};
	}
	
	if (['base', 'gbyte', 'bytes'].includes(asset.toLowerCase())) {
		return {
			asset:	'base',
			decimals:9,
			name: 'GBYTE'
		};
	}
	
	const inCache = assetMetadataCache.getValue(asset);
	if (inCache) {
		return inCache;
	}
	
	let rows;
	if (conf.useExternalRelay && !conf.useSQLiteForAssets) {
		rows = [getAssetMetadataFromMemory(asset)];
	} else {
		rows = await db.query('SELECT metadata_unit, registry_address, suffix FROM asset_metadata WHERE asset=?', [asset]);
	}
	
	if (rows.length === 0)
		return { error: 'no metadata' };
	
	const joint = await getJoint(rows[0].metadata_unit);
	
	const metadata = joint.unit.messages.find(
		(item) => item.app === 'data'
	);
	
	const result = { ...rows[0], ...metadata.payload };
	
	assetMetadataCache.setValue(asset, result);
	
	return result;
}

module.exports = {
	getAssetMetadata,
};
