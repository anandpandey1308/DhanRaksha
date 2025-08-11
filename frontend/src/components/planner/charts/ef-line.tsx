"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { usePlannerStore } from '../../../lib/store';
import { formatINRCompact } from '../../../lib/format';

const EmergencyFundLine: React.FC = () => {
  const { projections } = usePlannerStore();
  const data = (projections?.points || []).map(p => ({ name: p.label, EF: p.efBalance }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide interval={11} />
          <YAxis tickFormatter={(v: number)=>formatINRCompact(Number(v))} width={70} />
          <Tooltip formatter={(v: unknown)=>formatINRCompact(Number(v))} />
          <Line type="monotone" dataKey="EF" stroke="#06b6d4" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmergencyFundLine;
