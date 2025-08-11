"use client";

import React from "react";
import { usePlannerStore, type Fund } from "../../lib/store";
import { exportProjectionsToXLSX, exportProjectionsToPDF } from "@/lib/export";
import CurrencyInput from "@/components/system/currency-input";

const NumberInput = ({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) => (
  <label className="block text-sm">
    <span className="text-gray-600">{label}</span>
    <div className="mt-1 flex items-center rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500">
      <input
        type="number"
        className="w-full px-3 py-2 rounded-md outline-none"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {suffix && <span className="px-2 text-gray-500 text-xs">{suffix}</span>}
    </div>
  </label>
);

const PlannerControls: React.FC = () => {
  const {
    monthlyIncome,
    updateIncome,
    fixed,
    updateFixed,
    goals,
    updateGoals,
    portfolio,
    updateFundSIP,
    addFund,
    removeFund,
    updatePortfolioCurrentValue,
    assumptions,
    updateAssumptions,
    projections,
  } = usePlannerStore();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        Planner Controls
      </h3>

      <div className="space-y-4">
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-2">Budget</div>
          <div className="grid grid-cols-2 gap-3">
            <CurrencyInput
              label="Monthly Income"
              value={monthlyIncome}
              onChange={updateIncome}
            />
            <div />
            <CurrencyInput
              label="EMI + Rent"
              value={fixed.rentEmi}
              onChange={(v) => updateFixed({ rentEmi: v })}
            />
            <CurrencyInput
              label="Living"
              value={fixed.living}
              onChange={(v) => updateFixed({ living: v })}
            />
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-gray-500 mb-2">Goals</div>
          <div className="grid grid-cols-2 gap-3">
            <CurrencyInput
              label="Emergency Target"
              value={goals.emergencyTarget}
              onChange={(v) => updateGoals({ emergencyTarget: v })}
            />
            <CurrencyInput
              label="EF Base"
              value={goals.emergencyBaseMonthly}
              onChange={(v) => updateGoals({ emergencyBaseMonthly: v })}
              suffix="/mo"
            />
            <CurrencyInput
              label="EF Extra (until target)"
              value={goals.emergencyExtraMonthly}
              onChange={(v) => updateGoals({ emergencyExtraMonthly: v })}
              suffix="/mo"
            />
            <CurrencyInput
              label="Short-term Saving"
              value={goals.shortTermMonthly}
              onChange={(v) => updateGoals({ shortTermMonthly: v })}
              suffix="/mo"
            />
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-gray-500 mb-2">
            Investments
          </div>
          <div className="grid grid-cols-2 gap-3">
            <CurrencyInput
              label="Current Portfolio"
              value={portfolio.currentValue}
              onChange={(v) => updatePortfolioCurrentValue(v)}
            />
            <div />
          </div>
          <div className="mt-2 space-y-2">
            {portfolio.funds.map((f: Fund) => (
              <div
                key={f.id}
                className="flex items-center justify-between border rounded p-2"
              >
                <div className="text-sm text-gray-700">{f.name}</div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="w-28 px-2 py-1 border rounded"
                    value={f.monthlySIP}
                    onChange={(e) =>
                      updateFundSIP(f.id, Number(e.target.value))
                    }
                  />
                  <span className="text-xs text-gray-500">₹/mo</span>
                  <button
                    className="text-xs text-red-600"
                    onClick={() => removeFund(f.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              className="text-xs text-indigo-600"
              onClick={() => addFund(`Fund ${portfolio.funds.length + 1}`, 0)}
            >
              + Add Fund
            </button>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-gray-500 mb-2">
            Assumptions / Horizon
          </div>
          <div className="grid grid-cols-3 gap-3">
            <NumberInput
              label="Portfolio CAGR"
              value={assumptions.portfolioCAGR}
              onChange={(v) => updateAssumptions({ portfolioCAGR: v })}
              suffix="% p.a."
            />
            <NumberInput
              label="Emergency Return"
              value={assumptions.efReturn}
              onChange={(v) => updateAssumptions({ efReturn: v })}
              suffix="% p.a."
            />
            <NumberInput
              label="Plan Months"
              value={assumptions.planMonths}
              onChange={(v) => updateAssumptions({ planMonths: v })}
              suffix="mo"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-xs text-gray-500">
            Auto-saved to your browser. Projections update instantly.
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1.5 text-xs rounded bg-indigo-600 text-white"
              onClick={() =>
                exportProjectionsToXLSX({
                  projections,
                  meta: { monthlyIncome, fixed, goals, assumptions },
                })
              }
            >
              Export Excel
            </button>
            <button
              className="px-3 py-1.5 text-xs rounded border"
              onClick={() =>
                exportProjectionsToPDF({
                  projections,
                  meta: { monthlyIncome, fixed, goals, assumptions },
                })
              }
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerControls;
