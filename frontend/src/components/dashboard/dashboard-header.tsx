'use client';

import { useAuth } from '../../contexts/auth-context';
import { theme } from '../../../theme';
import { User } from '../../lib/auth-service';

interface DashboardHeaderProps {
  user: User | null;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header 
      className="px-6 py-4 border-b"
      style={{ 
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border 
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <span 
                className="text-lg font-bold"
                style={{ color: theme.colors.textInverse }}
              >
                DR
              </span>
            </div>
            <span 
              className="text-xl font-bold"
              style={{ 
                color: theme.colors.textPrimary,
                fontWeight: theme.typography.fontWeight.bold 
              }}
            >
              DhanRaksha
            </span>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="/dashboard" 
              className="px-3 py-2 rounded-md font-medium transition-colors"
              style={{ 
                color: theme.colors.primary,
                backgroundColor: `${theme.colors.primary}10`,
                fontWeight: theme.typography.fontWeight.medium 
              }}
            >
              Dashboard
            </a>
            <a 
              href="/transactions" 
              className="px-3 py-2 rounded-md font-medium transition-colors hover:bg-gray-100"
              style={{ 
                color: theme.colors.textSecondary,
                fontWeight: theme.typography.fontWeight.medium 
              }}
            >
              Transactions
            </a>
            <a 
              href="/budget" 
              className="px-3 py-2 rounded-md font-medium transition-colors hover:bg-gray-100"
              style={{ 
                color: theme.colors.textSecondary,
                fontWeight: theme.typography.fontWeight.medium 
              }}
            >
              Budget
            </a>
            <a 
              href="/goals" 
              className="px-3 py-2 rounded-md font-medium transition-colors hover:bg-gray-100"
              style={{ 
                color: theme.colors.textSecondary,
                fontWeight: theme.typography.fontWeight.medium 
              }}
            >
              Goals
            </a>
          </nav>
        </div>

        {/* User Profile and Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            style={{ color: theme.colors.textSecondary }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 17H4l5 5v-5zM4 7h16M4 12h16" />
            </svg>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.colors.primaryLight }}
            >
              <span 
                className="text-sm font-semibold"
                style={{ 
                  color: theme.colors.textInverse,
                  fontWeight: theme.typography.fontWeight.semibold 
                }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="hidden sm:block">
              <p 
                className="text-sm font-medium"
                style={{ 
                  color: theme.colors.textPrimary,
                  fontWeight: theme.typography.fontWeight.medium 
                }}
              >
                {user?.name || 'User'}
              </p>
              <p 
                className="text-xs"
                style={{ 
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.fontSize.xs 
                }}
              >
                {user?.email}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md font-medium transition-colors"
            style={{ 
              color: theme.colors.textSecondary,
              fontWeight: theme.typography.fontWeight.medium,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radii.md
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}