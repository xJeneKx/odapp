const DEFAULT_CACHE_TTL = 60 * 60 * 1000; // default 1 hour
const DEFAULT_CACHE_ITEMS_LIMIT = 1000;
const DEFAULT_CACHE_EXPIRATION_INTERVAL = 60 * 1000;

class CacheStorageService {
	#cache = {};
	
	#ttl;
	#limit;
	
	constructor({ maxItems, ttl } = {}) {
		this.#limit = maxItems || DEFAULT_CACHE_ITEMS_LIMIT;
		this.#ttl = ttl || DEFAULT_CACHE_TTL;
		
		setInterval(() => {
			this.#checkAndDeleteExpiredValues();
		}, DEFAULT_CACHE_EXPIRATION_INTERVAL);
	}
	
	#isCacheExpiredForKey(key) {
		return this.#cache[key].expTime <= Date.now();
	}
	
	#updateCacheExpirationTime(key) {
		this.#cache[key].expTime = Date.now() + this.#ttl;
	}
	
	#checkAndDeleteExpiredValues() {
		if (!Object.keys(this.#cache).length) {
			return;
		}
		
		for (let key in this.#cache) {
			if (this.#isCacheExpiredForKey(key)) {
				this.deleteValue(key);
			}
		}
	}
	
	getValue(key) {
		if (!this.#cache[key]) {
			return null;
		}
		
		this.#updateCacheExpirationTime(key);
		
		return this.#cache[key].value;
	}
	
	#sortAndDeleteTheMostUnusedKey() {
		let leastUsedKey = null;
		let minExpTime = Number.MAX_SAFE_INTEGER;
		
		for (const key of Object.keys(this.#cache)) {
			const expTime = this.#cache[key].expTime;
			if (expTime < minExpTime) {
				minExpTime = expTime;
				leastUsedKey = key;
			}
		}
		
		if (leastUsedKey !== null) {
			this.deleteValue(leastUsedKey);
		}
	}
	
	setValue(key, value) {
		if (Object.keys(this.#cache).length >= this.#limit) {
			this.#sortAndDeleteTheMostUnusedKey();
		}
		
		this.#cache[key] = {
			value,
			expTime: Date.now() + this.#ttl
		};
	}
	
	deleteValue(key) {
		delete this.#cache[key];
	}
}

module.exports = CacheStorageService;
