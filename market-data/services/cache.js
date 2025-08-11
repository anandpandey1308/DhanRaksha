// Simple in-memory cache with TTL
const store = new Map();

function set(key, value, ttlMs) {
  const expiresAt = ttlMs ? Date.now() + ttlMs : null;
  store.set(key, { value, expiresAt });
}

function get(key) {
  const item = store.get(key);
  if (!item) return null;
  if (item.expiresAt && item.expiresAt < Date.now()) {
    store.delete(key);
    return null;
  }
  return item.value;
}

function del(key) {
  store.delete(key);
}

module.exports = { set, get, del };
