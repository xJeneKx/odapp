const CacheStorageService = require('../services/CacheStorageService');

const cache = new CacheStorageService({ maxItems: 1000, ttl: 2 * 60 * 60 * 1000 });

module.exports = cache;
