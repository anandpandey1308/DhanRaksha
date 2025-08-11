const fetch = require('node-fetch');
const cache = require('./cache');

const AMFI_SCHEMES_URL = 'https://api.mfapi.in/mf';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

async function getMutualFunds({ refresh = false } = {}) {
  const cacheKey = 'amfi:schemes';
  if (!refresh) {
    const cached = cache.get(cacheKey);
    if (cached) return cached;
  }

  const res = await fetch(AMFI_SCHEMES_URL, { timeout: 15000 });
  if (!res.ok) throw new Error(`AMFI schemes fetch failed: ${res.status}`);
  const list = await res.json();

  // Keep only a subset of fields to keep payload small
  const data = list.map((x) => ({
    schemeCode: x.schemeCode,
    schemeName: x.schemeName,
    isActive: x.isActive,
  }));

  cache.set(cacheKey, data, ONE_DAY_MS);
  return data;
}

async function getTopFundsByDailyReturn({ count = 5 } = {}) {
  // Placeholder: Without reliable daily % change for all schemes, return the first N active funds.
  const list = await getMutualFunds({ refresh: false });
  const active = list.filter((x) => x.isActive !== false);
  const funds = active.slice(0, count).map((f) => ({
    schemeCode: f.schemeCode,
    schemeName: f.schemeName,
    changePct: null,
  }));
  return funds;
}

module.exports = { getMutualFunds, getTopFundsByDailyReturn };
