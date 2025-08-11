import { create } from 'zustand';
import { persist, StateStorage, createJSONStorage } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import localforage from 'localforage';

export type Fund = {
  id: string;
  name: string;
  monthlySIP: number;
};

export type Assumptions = {
  portfolioCAGR: number; // annual %
  efReturn: number; // annual %
  planMonths: number; // 60
};

export type FixedExpenses = {
  rentEmi: number;
  living: number;
};

export type Goals = {
  emergencyTarget: number; // 900000
  emergencyBaseMonthly: number; // 15000
  emergencyExtraMonthly: number; // 40000 (until target)
  shortTermMonthly: number; // 10000
  shortTermTarget?: number; // optional target for simulator
  shortTermMonths?: number; // optional timeframe in months
};

export type Portfolio = {
  currentValue: number; // 355875
  funds: Fund[]; // 5 funds
};

export type PlannerState = {
  // Inputs
  monthlyIncome: number; // 250000
  fixed: FixedExpenses;
  goals: Goals;
  portfolio: Portfolio;
  assumptions: Assumptions;
  // Derived last-run projections
  projections: ProjectionResult | null;
  lastComputedAt?: string;
  // Actions
  compute: () => void;
  updateIncome: (v: number) => void;
  updateFixed: (p: Partial<FixedExpenses>) => void;
  updateGoals: (p: Partial<Goals>) => void;
  updateAssumptions: (p: Partial<Assumptions>) => void;
  updateFundSIP: (fundId: string, monthlySIP: number) => void;
  addFund: (name: string, monthlySIP: number) => void;
  removeFund: (fundId: string) => void;
  updatePortfolioCurrentValue: (v: number) => void;
  reset: () => void;
};

export type ProjectionPoint = {
  monthIndex: number;
  label: string; // e.g., Aug 2025
  efBalance: number;
  efContribution: number;
  shortTermBalance: number;
  portfolioValue: number;
  portfolioContribution: number;
  netWorth: number;
};

export type ProjectionResult = {
  points: ProjectionPoint[];
  efCompletionMonthIndex: number | null;
  perFundValues: { fundId: string; name: string; values: number[] }[];
};

// Helpers
const monthLabel = (start: Date, i: number) => {
  const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
  return d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
};

const monthlyRateFromAPR = (aprPct: number) => Math.pow(1 + aprPct / 100, 1 / 12) - 1;

export function computeProjections(inp: {
  income: number;
  fixed: FixedExpenses;
  goals: Goals;
  portfolio: Portfolio;
  assumptions: Assumptions;
}): ProjectionResult {
  const { goals, portfolio, assumptions } = inp;
  const start = new Date();
  const months = Math.max(1, assumptions.planMonths);

  // const disposable = income - (fixed.rentEmi + fixed.living);
  // Base allocations
  const baseEF = goals.emergencyBaseMonthly;
  const extraEF = goals.emergencyExtraMonthly;
  const shortTerm = goals.shortTermMonthly;
  const baseSIPTotal = portfolio.funds.reduce((s, f) => s + f.monthlySIP, 0);

  const efMonthlyRate = monthlyRateFromAPR(assumptions.efReturn);
  const pfMonthlyRate = monthlyRateFromAPR(assumptions.portfolioCAGR);

  let efBalance = 0;
  let stBalance = 0;
  let portfolioValue = portfolio.currentValue;

  const perFundValues = portfolio.funds.map((f) => ({ fundId: f.id, name: f.name, values: [] as number[] }));

  let efCompletedAt: number | null = null;

  const points: ProjectionPoint[] = [];

  for (let i = 0; i < months; i++) {
    // Determine EF contribution this month
    const efContribution = efCompletedAt === null ? baseEF + extraEF : baseEF; // extra rerouted after completion

    // Determine SIP: base + rerouted extra once EF done
    const sipTotal = (efCompletedAt === null ? baseSIPTotal : baseSIPTotal + extraEF);

    // Emergency Fund growth and contributions
    if (efCompletedAt === null) {
      efBalance = efBalance * (1 + efMonthlyRate) + efContribution;
      if (efBalance >= goals.emergencyTarget) {
        efCompletedAt = i; // mark completion month
      }
    } else {
      // After completion, only base contribution continues with growth
      efBalance = efBalance * (1 + efMonthlyRate) + baseEF;
    }

    // Short-term goal accumulation (no returns assumed)
    stBalance += shortTerm;

    // Portfolio growth and SIP distribution per fund
    portfolioValue = portfolioValue * (1 + pfMonthlyRate) + sipTotal;

    // Allocate SIP to funds proportionally to their base SIP share
    const totalBase = baseSIPTotal || 1;
    perFundValues.forEach((pf, idx) => {
      const base = portfolio.funds[idx].monthlySIP;
      const share = base / totalBase;
      const fundContribution = (efCompletedAt === null ? baseSIPTotal : baseSIPTotal + extraEF) * share;
      const prev = pf.values.length ? pf.values[pf.values.length - 1] : portfolio.currentValue * share;
      const next = prev * (1 + pfMonthlyRate) + fundContribution;
      pf.values.push(next);
    });

    const netWorth = efBalance + stBalance + portfolioValue;

    points.push({
      monthIndex: i,
      label: monthLabel(start, i),
      efBalance: Math.round(efBalance),
      efContribution: Math.round(efContribution),
      shortTermBalance: Math.round(stBalance),
      portfolioValue: Math.round(portfolioValue),
      portfolioContribution: Math.round(sipTotal),
      netWorth: Math.round(netWorth),
    });
  }

  return {
    points,
    efCompletionMonthIndex: efCompletedAt,
    perFundValues,
  };
}

const idbStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const v = await localforage.getItem<string>(name);
    return v ?? null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await localforage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await localforage.removeItem(name);
  },
};

const initialFunds: Fund[] = [
  { id: 'f1', name: 'Fund A', monthlySIP: 10000 },
  { id: 'f2', name: 'Fund B', monthlySIP: 10000 },
  { id: 'f3', name: 'Fund C', monthlySIP: 10000 },
  { id: 'f4', name: 'Fund D', monthlySIP: 10000 },
  { id: 'f5', name: 'Fund E', monthlySIP: 10000 },
];

export const usePlannerStore = create<PlannerState>()(
  persist(
    ((set: (partial: Partial<PlannerState> | ((state: PlannerState) => Partial<PlannerState>)) => void, get: () => PlannerState) => ({
      monthlyIncome: 250000,
      fixed: { rentEmi: 70000, living: 65000 },
      goals: {
        emergencyTarget: 900000,
        emergencyBaseMonthly: 15000,
        emergencyExtraMonthly: 40000,
        shortTermMonthly: 10000,
      },
      portfolio: {
        currentValue: 355875,
        funds: initialFunds,
      },
      assumptions: {
        portfolioCAGR: 14.4,
        efReturn: 6,
        planMonths: 60,
      },
      projections: null,
      compute: (): void => {
        const s = get();
        const proj = computeProjections({
          income: s.monthlyIncome,
          fixed: s.fixed,
          goals: s.goals,
          portfolio: s.portfolio,
          assumptions: s.assumptions,
        });
        set({ projections: proj, lastComputedAt: new Date().toISOString() });
      },
      updateIncome: (v: number): void => set({ monthlyIncome: v }),
      updateFixed: (p: Partial<FixedExpenses>): void => set((s: PlannerState) => ({ fixed: { ...s.fixed, ...p } })),
      updateGoals: (p: Partial<Goals>): void => set((s: PlannerState) => ({ goals: { ...s.goals, ...p } })),
      updateAssumptions: (p: Partial<Assumptions>): void => set((s: PlannerState) => ({ assumptions: { ...s.assumptions, ...p } })),
      updateFundSIP: (fundId: string, monthlySIP: number): void =>
        set((s: PlannerState) => ({ portfolio: { ...s.portfolio, funds: s.portfolio.funds.map((f: Fund) => f.id === fundId ? { ...f, monthlySIP } : f) } })),
      addFund: (name: string, monthlySIP: number): void =>
        set((s: PlannerState) => ({ portfolio: { ...s.portfolio, funds: [...s.portfolio.funds, { id: `f${Date.now()}`, name, monthlySIP }] } })),
      removeFund: (fundId: string): void =>
        set((s: PlannerState) => ({ portfolio: { ...s.portfolio, funds: s.portfolio.funds.filter((f: Fund) => f.id !== fundId) } })),
      updatePortfolioCurrentValue: (v: number): void => set((s: PlannerState) => ({ portfolio: { ...s.portfolio, currentValue: v } })),
      reset: (): void => set(() => ({
        monthlyIncome: 250000,
        fixed: { rentEmi: 70000, living: 65000 },
        goals: {
          emergencyTarget: 900000,
          emergencyBaseMonthly: 15000,
          emergencyExtraMonthly: 40000,
          shortTermMonthly: 10000,
        },
        portfolio: {
          currentValue: 356101,
          funds: initialFunds,
        },
        assumptions: { portfolioCAGR: 14.4, efReturn: 6, planMonths: 60 },
        projections: null,
        lastComputedAt: undefined,
      })),
    })) as unknown as StateCreator<PlannerState>,
    {
      name: 'dhanraksha-planner-v1',
      storage: createJSONStorage(() => idbStorage),
      partialize: (s: PlannerState) => ({
        monthlyIncome: s.monthlyIncome,
        fixed: s.fixed,
        goals: s.goals,
        portfolio: s.portfolio,
        assumptions: s.assumptions,
      }),
    }
  )
);
