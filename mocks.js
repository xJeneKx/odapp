const { dirname } = require('path');
const kvPath = require.resolve('ocore/kvstore.js');
require.cache[kvPath] = {
	id: kvPath,
	path: dirname(kvPath),
	exports: require('./src/services/kv.js'),
	filename: kvPath,
	loaded: true,
};

const dbPath = require.resolve('ocore/db.js');
require.cache[dbPath] = {
	id: dbPath,
	path: dirname(dbPath),
	exports: require('./src/services/db.js'),
	filename: dbPath,
	loaded: true,
};

