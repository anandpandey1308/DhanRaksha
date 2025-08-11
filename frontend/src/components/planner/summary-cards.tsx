"use client";

import React, { useMemo } from 'react';
import { usePlannerStore, type Fund } from '../../lib/store';
import { formatINR } from '../../lib/format';

const Card: React.FC<{ title: string; value: string; sub?: string; accent?: 'blue'|'green'|'purple'|'indigo' }>=({ title, value, sub, accent='indigo' })=>{
  const colors: Record<string,string> = {
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
    green: 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300',
    indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
  };
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</div>
      <div className={`inline-flex items-center px-2 py-1 rounded ${colors[accent]} text-sm font-semibold`}>{value}</div>
      {sub && <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{sub}</div>}
    </div>
  );
};

const SummaryCards: React.FC = () => {
  const { monthlyIncome, fixed, goals, portfolio, assumptions, projections } = usePlannerStore();

  const latest = useMemo(() => projections?.points?.[projections.points.length - 1], [projections]);
  const efProgressPct = useMemo(() => {
    const target = goals.emergencyTarget || 0;
    if (!target) return 0;
    const lastEf = projections?.points?.[projections.points.length - 1]?.efBalance ?? 0;
    const cur = Math.min(lastEf, target);
    return Math.round((cur / target) * 100);
  }, [projections, goals.emergencyTarget]);

  const alloc = useMemo(() => {
    const efContribution = projections?.points?.[0]?.efContribution ?? (goals.emergencyBaseMonthly + goals.emergencyExtraMonthly);
    const sip = projections?.points?.[0]?.portfolioContribution ?? portfolio.funds.reduce((s: number, f: Fund)=>s+f.monthlySIP,0);
    const st = goals.shortTermMonthly;
    return { efContribution, sip, st };
  }, [projections, goals, portfolio.funds]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Monthly Income" value={formatINR(monthlyIncome)} sub={`Fixed: ${formatINR(fixed.rentEmi + fixed.living)}`} accent="blue" />
      <Card title="Monthly Allocation" value={`${formatINR(alloc.efContribution)} EF • ${formatINR(alloc.st)} Short • ${formatINR(alloc.sip)} SIP`} accent="purple" />
      <Card title="Emergency Fund Progress" value={`${efProgressPct}%`} sub={`Target: ${formatINR(goals.emergencyTarget)}`} accent="green" />
      <Card title="Projected Net Worth (5y)" value={latest ? formatINR(latest.netWorth) : '—'} sub={`Portfolio CAGR ${assumptions.portfolioCAGR}%`} />
    </div>
  );
};

export default SummaryCards;
