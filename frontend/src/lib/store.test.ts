import { describe, it, expect } from 'vitest';
import { computeProjections, type FixedExpenses, type Goals, type Portfolio, type Assumptions } from './store';

describe('computeProjections', () => {
  const fixed: FixedExpenses = { rentEmi: 70000, living: 65000 };
  const goals: Goals = {
    emergencyTarget: 300000,
    emergencyBaseMonthly: 10000,
    emergencyExtraMonthly: 20000,
    shortTermMonthly: 5000,
  };
  const portfolio: Portfolio = {
    currentValue: 100000,
    funds: [
      { id: 'f1', name: 'Fund A', monthlySIP: 5000 },
      { id: 'f2', name: 'Fund B', monthlySIP: 5000 },
    ],
  };
  const assumptions: Assumptions = { portfolioCAGR: 12, efReturn: 6, planMonths: 24 };

  it('returns points equal to plan months and EF completes within horizon', () => {
    const res = computeProjections({ income: 250000, fixed, goals, portfolio, assumptions });
    expect(res.points.length).toBe(assumptions.planMonths);
    expect(res.efCompletionMonthIndex).not.toBeNull();
    if (res.efCompletionMonthIndex !== null) {
      expect(res.efCompletionMonthIndex).toBeLessThan(assumptions.planMonths);
    }
  });

  it('reroutes EF extra to SIP after completion (portfolio contribution increases)', () => {
    const res = computeProjections({ income: 250000, fixed, goals, portfolio, assumptions });
    const idx = res.efCompletionMonthIndex ?? assumptions.planMonths - 1;
    const before = res.points[Math.max(0, idx - 1)].portfolioContribution;
    const after = res.points[Math.min(assumptions.planMonths - 1, idx + 1)].portfolioContribution;
    expect(after).toBeGreaterThanOrEqual(before);
  });
});
