'use client';

import React, { useEffect, useMemo } from 'react';
import { usePlannerStore } from '../../lib/store';
import { formatINR } from '../../lib/format';
import { motion } from 'framer-motion';
import NetWorthLine from '@/components/planner/charts/net-worth-line';
import EmergencyFundLine from '@/components/planner/charts/ef-line';
import AllocationBar from '@/components/planner/charts/allocation-bar';
import PlannerControls from '@/components/planner/controls';
import SummaryCards from '@/components/planner/summary-cards';

const DashboardPage: React.FC = () => {
  const {
    monthlyIncome,
    fixed,
    goals,
    portfolio,
    assumptions,
    projections,
    compute,
  } = usePlannerStore();

  // Auto compute on first load and whenever inputs change
  useEffect(() => {
    compute();
  }, [monthlyIncome, fixed, goals, portfolio, assumptions, compute]);

  const latest = useMemo(() => projections?.points?.[projections.points.length - 1], [projections]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">DhanRaksha — Planning & Goals</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">Income {formatINR(monthlyIncome)} • Plan {assumptions.planMonths} months</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SummaryCards />

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Net Worth Projection (5 years)</h3>
                <NetWorthLine />
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emergency Fund Growth</h3>
                <EmergencyFundLine />
              </div>
            </motion.div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Allocation</h3>
              <AllocationBar />
            </div>
          </div>

          <div className="space-y-6">
            <PlannerControls />
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Summary</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>EF Target: {formatINR(goals.emergencyTarget)} at {assumptions.efReturn}% p.a.</li>
                <li>Portfolio CAGR: {assumptions.portfolioCAGR}% p.a.</li>
                <li>Current Portfolio: {formatINR(portfolio.currentValue)}</li>
                {(() => { const efIndex = projections?.efCompletionMonthIndex; return (efIndex !== null && efIndex !== undefined) ? (
                  <li>EF completes in month {efIndex + 1}</li>
                ) : null; })()}
                {latest && (
                  <li>Projected Net Worth: {formatINR(latest.netWorth)}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;