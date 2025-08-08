'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { theme } from '../../theme';

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: theme.colors.primary }}></div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: theme.colors.background, fontFamily: theme.typography.fontFamily }}>
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
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
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/auth/login" 
              className="px-4 py-2 rounded-md font-medium transition-colors"
              style={{ 
                color: theme.colors.textSecondary,
                fontWeight: theme.typography.fontWeight.medium 
              }}
            >
              Sign In
            </Link>
            <Link 
              href="/auth/signup" 
              className="px-6 py-2 rounded-md font-medium transition-colors"
              style={{ 
                backgroundColor: theme.colors.primary,
                color: theme.colors.textInverse,
                borderRadius: theme.radii.md,
                fontWeight: theme.typography.fontWeight.medium 
              }}
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ 
              color: theme.colors.textPrimary,
              fontWeight: theme.typography.fontWeight.bold,
              fontSize: theme.typography.fontSize['4xl']
            }}
          >
            Secure Your Financial Future with{' '}
            <span style={{ color: theme.colors.primary }}>DhanRaksha</span>
          </h1>
          
          <p 
            className="text-xl mb-12 max-w-3xl mx-auto"
            style={{ 
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.xl 
            }}
          >
            Take control of your finances with intelligent budgeting, expense tracking, 
            and personalized financial insights. Your path to financial freedom starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/auth/signup" 
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
              style={{ 
                backgroundColor: theme.colors.primary,
                color: theme.colors.textInverse,
                borderRadius: theme.radii.lg,
                fontWeight: theme.typography.fontWeight.semibold,
                boxShadow: theme.shadows.lg
              }}
            >
              Start Free Today
            </Link>
            <Link 
              href="/auth/login" 
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-colors border"
              style={{ 
                color: theme.colors.primary,
                borderColor: theme.colors.primary,
                borderRadius: theme.radii.lg,
                fontWeight: theme.typography.fontWeight.semibold 
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20" style={{ backgroundColor: theme.colors.surface }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl font-bold mb-4"
              style={{ 
                color: theme.colors.textPrimary,
                fontWeight: theme.typography.fontWeight.bold,
                fontSize: theme.typography.fontSize['3xl']
              }}
            >
              Everything You Need for Financial Success
            </h2>
            <p 
              className="text-lg"
              style={{ 
                color: theme.colors.textSecondary,
                fontSize: theme.typography.fontSize.lg 
              }}
            >
              Comprehensive tools to manage, track, and grow your wealth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Budget Management */}
            <div 
              className="p-8 rounded-lg shadow-md"
              style={{ 
                backgroundColor: theme.colors.background,
                borderRadius: theme.radii.lg,
                boxShadow: theme.shadows.md 
              }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: `${theme.colors.primary}20` }}
              >
                <span 
                  className="text-2xl"
                  style={{ color: theme.colors.primary }}
                >
                  💰
                </span>
              </div>
              <h3 
                className="text-xl font-semibold mb-4"
                style={{ 
                  color: theme.colors.textPrimary,
                  fontWeight: theme.typography.fontWeight.semibold 
                }}
              >
                Smart Budgeting
              </h3>
              <p 
                style={{ 
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.fontSize.base 
                }}
              >
                Create and manage budgets with intelligent categorization and real-time tracking.
              </p>
            </div>

            {/* Expense Tracking */}
            <div 
              className="p-8 rounded-lg shadow-md"
              style={{ 
                backgroundColor: theme.colors.background,
                borderRadius: theme.radii.lg,
                boxShadow: theme.shadows.md 
              }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: `${theme.colors.secondary}20` }}
              >
                <span 
                  className="text-2xl"
                  style={{ color: theme.colors.secondary }}
                >
                  📊
                </span>
              </div>
              <h3 
                className="text-xl font-semibold mb-4"
                style={{ 
                  color: theme.colors.textPrimary,
                  fontWeight: theme.typography.fontWeight.semibold 
                }}
              >
                Expense Analytics
              </h3>
              <p 
                style={{ 
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.fontSize.base 
                }}
              >
                Visualize your spending patterns with detailed analytics and insights.
              </p>
            </div>

            {/* Financial Goals */}
            <div 
              className="p-8 rounded-lg shadow-md"
              style={{ 
                backgroundColor: theme.colors.background,
                borderRadius: theme.radii.lg,
                boxShadow: theme.shadows.md 
              }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: `${theme.colors.profit}20` }}
              >
                <span 
                  className="text-2xl"
                  style={{ color: theme.colors.profit }}
                >
                  🎯
                </span>
              </div>
              <h3 
                className="text-xl font-semibold mb-4"
                style={{ 
                  color: theme.colors.textPrimary,
                  fontWeight: theme.typography.fontWeight.semibold 
                }}
              >
                Goal Planning
              </h3>
              <p 
                style={{ 
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.fontSize.base 
                }}
              >
                Set and track financial goals with personalized savings strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl font-bold mb-6"
            style={{ 
              color: theme.colors.textPrimary,
              fontWeight: theme.typography.fontWeight.bold,
              fontSize: theme.typography.fontSize['3xl']
            }}
          >
            Ready to Transform Your Financial Life?
          </h2>
          <p 
            className="text-lg mb-8"
            style={{ 
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.lg 
            }}
          >
            Join thousands of users who have taken control of their finances with DhanRaksha
          </p>
          <Link 
            href="/auth/signup" 
            className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            style={{ 
              backgroundColor: theme.colors.primary,
              color: theme.colors.textInverse,
              borderRadius: theme.radii.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              boxShadow: theme.shadows.lg
            }}
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="px-6 py-12"
        style={{ backgroundColor: theme.colors.surfaceAlt }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <span 
                className="text-sm font-bold"
                style={{ color: theme.colors.textInverse }}
              >
                DR
              </span>
            </div>
            <span 
              className="text-lg font-bold"
              style={{ 
                color: theme.colors.textPrimary,
                fontWeight: theme.typography.fontWeight.bold 
              }}
            >
              DhanRaksha
            </span>
          </div>
          <p 
            style={{ 
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.sm 
            }}
          >
            © 2025 DhanRaksha. Secure your financial future.
          </p>
        </div>
      </footer>
    </div>
  );
}
