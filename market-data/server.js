// Minimal Express server for Market Data Module
const express = require('express');
const cors = require('cors');
const { getMutualFunds, getTopFundsByDailyReturn } = require('./services/amfiService');
const { getIndices } = require('./services/indicesService');
const { getFundHistory } = require('./services/fundHistoryService');
const { getDailyInsights } = require('./insights/aiAdvisor');

const app = express();
const PORT = process.env.MARKET_PORT || 4001;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: FRONTEND_ORIGIN, credentials: false }));
app.use(express.json());

// Health check
app.get('/api/market/health', (_, res) => res.json({ ok: true }));

// GET /api/market/mutual-funds
// Query params:
//   refresh=1 to bypass 24h cache
app.get('/api/market/mutual-funds', async (req, res) => {
  const refresh = req.query.refresh === '1' || req.query.refresh === 'true';
  try {
    const data = await getMutualFunds({ refresh });
    res.json(data);
  } catch (err) {
    console.error('Error fetching mutual funds:', err);
    res.status(500).json({ error: 'Failed to fetch mutual funds' });
  }
});

// GET /api/market/mutual-funds/top
// Query params: count (default 5)
app.get('/api/market/mutual-funds/top', async (req, res) => {
  const count = Math.max(1, Math.min(50, Number(req.query.count) || 5));
  try {
    const top = await getTopFundsByDailyReturn({ count });
    res.json({ count: top.length, funds: top });
  } catch (err) {
    console.error('Error computing top funds:', err);
    res.status(500).json({ error: 'Failed to compute top funds' });
  }
});

// GET /api/market/funds/:schemeCode/history
// Query params: days (default 30)
app.get('/api/market/funds/:schemeCode/history', async (req, res) => {
  const { schemeCode } = req.params;
  const days = Math.max(1, Math.min(365, Number(req.query.days) || 30));
  try {
    const history = await getFundHistory({ schemeCode, days });
    res.json({ schemeCode, days, points: history });
  } catch (err) {
    console.error('Error fetching fund history:', err);
    res.status(500).json({ error: 'Failed to fetch fund history' });
  }
});

// GET /api/market/indices
// Query params: refresh=1 to bypass cache
app.get('/api/market/indices', async (req, res) => {
  const refresh = req.query.refresh === '1' || req.query.refresh === 'true';
  try {
    const indices = await getIndices({ refresh });
    res.json(indices);
  } catch (err) {
    console.error('Error fetching indices:', err);
    res.status(500).json({ error: 'Failed to fetch indices' });
  }
});

// GET /api/market/insights/fund/:schemeCode
// Uses AI placeholder to compare fund daily return vs NIFTY 50
app.get('/api/market/insights/fund/:schemeCode', async (req, res) => {
  const { schemeCode } = req.params;
  try {
    const [{ points }, indices] = await Promise.all([
      getFundHistory({ schemeCode, days: 2 }),
      getIndices({ refresh: false }),
    ]);

    // Compute 1-day fund return
    let fundChangePct = 0;
    if (points && points.length >= 2) {
      const latest = Number(points[0].nav);
      const prev = Number(points[1].nav);
      if (prev > 0) fundChangePct = ((latest - prev) / prev) * 100;
    }

    const nifty = indices.indices?.nifty50;
    const niftyChangePct = nifty?.percChange ?? 0;

    const insight = getDailyInsights({ fundChangePct, niftyChangePct });
    res.json({ schemeCode, fundChangePct, niftyChangePct, insight });
  } catch (err) {
    console.error('Error generating insights:', err);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

app.listen(PORT, () => {
  console.log(`Market Data server running at http://localhost:${PORT}`);
});
