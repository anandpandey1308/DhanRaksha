'use client';

import { theme } from '../../../theme';

interface BudgetProgressProps {
  data: {
    budgetUsed: number;
    monthlyExpenses: number;
  };
}

export default function BudgetProgress({ data }: BudgetProgressProps) {
  const budgetCategories = [
    { name: 'Food & Dining', spent: 1200, budget: 2000, color: theme.colors.chart1 },
    { name: 'Transportation', spent: 800, budget: 1000, color: theme.colors.chart2 },
    { name: 'Utilities', spent: 450, budget: 600, color: theme.colors.chart3 },
    { name: 'Entertainment', spent: 300, budget: 500, color: theme.colors.chart4 },
    { name: 'Shopping', spent: 650, budget: 800, color: theme.colors.chart5 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      className="p-6 rounded-lg shadow-md"
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.lg,
        boxShadow: theme.shadows.md
      }}
    >
      <h3
        className="text-lg font-semibold mb-4"
        style={{
          color: theme.colors.textPrimary,
          fontWeight: theme.typography.fontWeight.semibold,
          fontSize: theme.typography.fontSize.lg
        }}
      >
        Budget Progress
      </h3>

      {/* Overall Budget Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-sm font-medium"
            style={{
              color: theme.colors.textSecondary,
              fontWeight: theme.typography.fontWeight.medium,
              fontSize: theme.typography.fontSize.sm
            }}
          >
            Overall Budget
          </span>
          <span
            className="text-sm font-semibold"
            style={{
              color: theme.colors.textPrimary,
              fontWeight: theme.typography.fontWeight.semibold,
              fontSize: theme.typography.fontSize.sm
            }}
          >
            {data.budgetUsed}%
          </span>
        </div>
        <div
          className="w-full h-3 rounded-full"
          style={{
            backgroundColor: theme.colors.surfaceAlt,
            borderRadius: theme.radii.full
          }}
        >
          <div
            className="h-3 rounded-full transition-all duration-300"
            style={{
              width: `${data.budgetUsed}%`,
              backgroundColor: data.budgetUsed > 80 ? theme.colors.loss : data.budgetUsed > 60 ? theme.colors.warning : theme.colors.profit,
              borderRadius: theme.radii.full
            }}
          />
        </div>
      </div>

      {/* Category Budgets */}
      <div className="space-y-4">
        {budgetCategories.map((category, index) => {
          const percentage = (category.spent / category.budget) * 100;
          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-sm font-medium"
                  style={{
                    color: theme.colors.textPrimary,
                    fontWeight: theme.typography.fontWeight.medium,
                    fontSize: theme.typography.fontSize.sm
                  }}
                >
                  {category.name}
                </span>
                <span
                  className="text-xs"
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.fontSize.xs
                  }}
                >
                  {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                </span>
              </div>
              <div
                className="w-full h-2 rounded-full"
                style={{
                  backgroundColor: theme.colors.surfaceAlt,
                  borderRadius: theme.radii.full
                }}
              >
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: category.color,
                    borderRadius: theme.radii.full
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}