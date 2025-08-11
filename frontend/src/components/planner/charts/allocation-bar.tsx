"use client";

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { usePlannerStore } from '../../../lib/store';
import { formatINRCompact } from '../../../lib/format';

const AllocationBar: React.FC = () => {
  const { monthlyIncome, fixed, goals, portfolio } = usePlannerStore();

  const data = useMemo(() => {
    const ef = goals.emergencyBaseMonthly + goals.emergencyExtraMonthly;
    const st = goals.shortTermMonthly;
    const sip = portfolio.funds.reduce((sum, f) => sum + f.monthlySIP, 0);
    const discretionary = Math.max(0, monthlyIncome - (fixed.rentEmi + fixed.living + ef + st + sip));
    return [{ name: 'Month 1', EF: ef, Short: st, SIP: sip, Discretionary: discretionary }];
  }, [monthlyIncome, fixed.rentEmi, fixed.living, goals.emergencyBaseMonthly, goals.emergencyExtraMonthly, goals.shortTermMonthly, portfolio.funds]);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v: number)=>formatINRCompact(Number(v))} width={70} />
          <Tooltip formatter={(v: unknown)=>formatINRCompact(Number(v))} />
          <Legend />
          <Bar dataKey="EF" stackId="a" fill="#6366f1" />
          <Bar dataKey="Short" stackId="a" fill="#22c55e" />
          <Bar dataKey="SIP" stackId="a" fill="#f59e0b" />
          <Bar dataKey="Discretionary" stackId="a" fill="#94a3b8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AllocationBar;
