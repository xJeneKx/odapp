const CacheStorageService = require('../services/CacheStorageService');

const cache = new CacheStorageService({ maxItems: 2000, ttl: 60 * 60 * 1000 });

module.exports = cache;
