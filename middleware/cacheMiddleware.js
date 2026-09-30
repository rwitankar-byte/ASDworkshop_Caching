const cache = new Map();

const TTL = 60 * 1000; // 1 minute


function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;

  const cachedEntry = cache.get(key);

  // Cache MISS
  if (!cachedEntry) {
    res.set('X-Cache', 'MISS');

    return next();
  }

  // Check TTL
  const age = Date.now() - cachedEntry.createdAt;

  // Cache expired
  if (age > TTL) {
    cache.delete(key);

    res.set('X-Cache', 'MISS');

    return next();
  }

  // Cache HIT
  res.set('X-Cache', 'HIT');

  return res.status(200).json(cachedEntry.data);
}


function storeCache(req, data) {
  const key = req.originalUrl;

  cache.set(key, {
    data: data,
    createdAt: Date.now()
  });
}


function invalidateCache(req, res, next) {
  res.on('finish', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.clear();

      console.log('Cache invalidated');
    }
  });

  next();
}


module.exports = {
  cacheMiddleware,
  storeCache,
  invalidateCache
};