const CacheStorageService = require('../services/CacheStorageService');

const cache = new CacheStorageService({ maxItems: 5000, ttl: 60 * 60 * 1000 });

module.exports = cache;
