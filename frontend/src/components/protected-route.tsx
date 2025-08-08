'use client';

import { useAuth } from '../contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { theme } from '../../theme';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  redirectTo = '/auth/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo);
      } else if (!requireAuth && isAuthenticated) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, loading, requireAuth, redirectTo, router]);

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center" 
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="flex flex-col items-center space-y-4">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: theme.colors.primary }}
          ></div>
          <p 
            className="text-sm font-medium"
            style={{ 
              color: theme.colors.textSecondary,
              fontFamily: theme.typography.fontFamily 
            }}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}