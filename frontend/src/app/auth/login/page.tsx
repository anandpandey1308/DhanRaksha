'use client';

import { useState, CSSProperties } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../contexts/auth-context';
import { loginSchema, LoginFormData } from '../../../lib/schemas';
import { ProtectedRoute } from '../../../components/protected-route';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { theme } from '../../../../theme';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError('');
      await login(data.email, data.password);
      router.push('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error && err.message
        ? err.message
        : 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: CSSProperties = {
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    borderRadius: theme.radii.md,
    fontSize: theme.typography.fontSize.base,
  };

  const errorInputStyle: CSSProperties = {
    ...inputStyle,
    borderColor: theme.colors.loss,
  };

  return (
    <ProtectedRoute requireAuth={false}>
      <div 
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{ 
          backgroundColor: theme.colors.background,
          fontFamily: theme.typography.fontFamily 
        }}
      >
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <span 
                  className="text-2xl font-bold"
                  style={{ color: theme.colors.textInverse }}
                >
                  DR
                </span>
              </div>
            </div>
            <h2 
              className="text-3xl font-bold"
              style={{ 
                color: theme.colors.textPrimary,
                fontWeight: theme.typography.fontWeight.bold 
              }}
            >
              Welcome to DhanRaksha
            </h2>
            <p 
              className="mt-2 text-sm"
              style={{ 
                color: theme.colors.textSecondary,
                fontSize: theme.typography.fontSize.sm 
              }}
            >
              Secure your financial future with confidence
            </p>
          </div>

          {/* Form */}
          <div 
            className="p-8 rounded-lg shadow-lg"
            style={{ 
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radii.lg,
              boxShadow: theme.shadows.lg 
            }}
          >
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <div 
                  className="p-4 rounded-md text-sm"
                  style={{ 
                    backgroundColor: '#FEF2F2',
                    color: theme.colors.loss,
                    border: `1px solid ${theme.colors.loss}20`,
                    borderRadius: theme.radii.md 
                  }}
                >
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      color: theme.colors.textPrimary,
                      fontWeight: theme.typography.fontWeight.medium 
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors"
                    style={errors.email ? errorInputStyle : inputStyle}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p 
                      className="mt-1 text-sm"
                      style={{ 
                        color: theme.colors.loss,
                        fontSize: theme.typography.fontSize.sm 
                      }}
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      color: theme.colors.textPrimary,
                      fontWeight: theme.typography.fontWeight.medium 
                    }}
                  >
                    Password
                  </label>
                  <input
                    {...register('password')}
                    type="password"
                    className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors"
                    style={errors.password ? errorInputStyle : inputStyle}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p 
                      className="mt-1 text-sm"
                      style={{ 
                        color: theme.colors.loss,
                        fontSize: theme.typography.fontSize.sm 
                      }}
                    >
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: loading ? theme.colors.neutral : theme.colors.primary,
                  color: theme.colors.textInverse,
                  borderRadius: theme.radii.md,
                  fontWeight: theme.typography.fontWeight.medium,
                  fontSize: theme.typography.fontSize.base,
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = theme.colors.primaryDark;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = theme.colors.primary;
                  }
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="text-center">
                <p 
                  className="text-sm"
                  style={{ 
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.fontSize.sm 
                  }}
                >
                  Don&apos;t have an account?{' '}
                  <Link 
                    href="/auth/signup" 
                    className="font-medium hover:underline transition-colors"
                    style={{ 
                      color: theme.colors.primary,
                      fontWeight: theme.typography.fontWeight.medium 
                    }}
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}