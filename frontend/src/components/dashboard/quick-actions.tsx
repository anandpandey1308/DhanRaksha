'use client';

import { theme } from '../../../theme';

export default function QuickActions() {
  const actions = [
    {
      title: 'Add Income',
      icon: '💰',
      color: theme.colors.profit,
      bgColor: `${theme.colors.profit}15`,
      action: () => console.log('Add Income')
    },
    {
      title: 'Add Expense',
      icon: '💸',
      color: theme.colors.loss,
      bgColor: `${theme.colors.loss}15`,
      action: () => console.log('Add Expense')
    },
    {
      title: 'Set Budget',
      icon: '🎯',
      color: theme.colors.secondary,
      bgColor: `${theme.colors.secondary}15`,
      action: () => console.log('Set Budget')
    },
    {
      title: 'View Reports',
      icon: '📊',
      color: theme.colors.warning,
      bgColor: `${theme.colors.warning}15`,
      action: () => console.log('View Reports')
    }
  ];

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
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="p-4 rounded-lg text-left transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: action.bgColor,
              borderRadius: theme.radii.md
            }}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{action.icon}</span>
              <div>
                <p
                  className="text-sm font-medium"
                  style={{
                    color: action.color,
                    fontWeight: theme.typography.fontWeight.medium,
                    fontSize: theme.typography.fontSize.sm
                  }}
                >
                  {action.title}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}