"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { usePlannerStore } from '../../../lib/store';
import { formatINRCompact } from '../../../lib/format';

const NetWorthLine: React.FC = () => {
  const { projections } = usePlannerStore();
  const data = (projections?.points || []).map(p => ({
    name: p.label,
    NetWorth: p.netWorth,
    Portfolio: p.portfolioValue,
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide tick={{ fontSize: 10 }} interval={11} />
          <YAxis tickFormatter={(v: number)=>formatINRCompact(v)} width={70} />
          <Tooltip formatter={(v: unknown)=>formatINRCompact(Number(v))} />
          <Legend />
          <Line type="monotone" dataKey="NetWorth" stroke="#4f46e5" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="Portfolio" stroke="#10b981" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetWorthLine;
