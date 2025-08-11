"use client";

import React, { useState } from 'react';
import { usePlannerStore } from '@/lib/store';
import { exportProjectionsToXLSX, exportProjectionsToPDF } from '@/lib/export';

const ExportActions: React.FC = () => {
  const { projections, monthlyIncome, fixed, goals, assumptions } = usePlannerStore();
  const [busy, setBusy] = useState<string | null>(null);

  const handleXLSX = async () => {
    try {
      setBusy('xlsx');
      await exportProjectionsToXLSX({ projections, meta: { monthlyIncome, fixed, goals, assumptions } });
    } finally {
      setBusy(null);
    }
  };

  const handlePDF = async () => {
    try {
      setBusy('pdf');
      await exportProjectionsToPDF({ projections, meta: { monthlyIncome, fixed, goals, assumptions } });
    } finally {
      setBusy(null);
    }
  };

  const disabled = !projections || (projections.points?.length ?? 0) === 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Export</h3>
      <div className="flex gap-3">
        <button onClick={handleXLSX} disabled={disabled || busy === 'xlsx'} className="px-3 py-2 rounded bg-indigo-600 disabled:bg-gray-400 text-white text-sm">
          {busy === 'xlsx' ? 'Exporting…' : 'Export XLSX'}
        </button>
        <button onClick={handlePDF} disabled={disabled || busy === 'pdf'} className="px-3 py-2 rounded bg-gray-800 disabled:bg-gray-400 text-white text-sm">
          {busy === 'pdf' ? 'Exporting…' : 'Export PDF'}
        </button>
      </div>
    </div>
  );
};

export default ExportActions;
