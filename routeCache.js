const NodeCache = require('node-cache');

const cache = new NodeCache();

module.exports = duration => (req, res, next) => {
	if (req.method !== 'GET') {
		console.log('cannot cache non GET methods');
		next();
	}

	const key = req.originalUrl || req.url;

	const cacheResponse = cache.get(key);

	if (cacheResponse) {
		console.log(`cache hit for ${key}`);
		res.send(cacheResponse);
	} else {
		console.log(`cache miss for ${key}`);
		res.originalSend = res.send;
		res.send = body => {
			cache.set(key, body, duration);
			res.originalSend(body);
		};
		next();
	}
};
