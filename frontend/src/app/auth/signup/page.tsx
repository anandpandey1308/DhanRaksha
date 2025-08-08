'use client';

import { useState, CSSProperties } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupFormData } from '../../../lib/schemas';
import { authService } from '../../../lib/auth-service';
import { ProtectedRoute } from '../../../components/protected-route';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { theme } from '../../../../theme';

export default function SignupPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      setError('');
      
      // Combine firstName and lastName into a single name field
      const signupData = {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`.trim(),
      };
      
      // Step 1: Signup and get token
      await authService.signup(signupData);
      
      // Step 2: Fetch user profile and redirect will be handled by auth context
      router.push('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error && err.message
        ? err.message
        : 'Signup failed. Please try again.';
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
              Join DhanRaksha
            </h2>
            <p 
              className="mt-2 text-sm"
              style={{ 
                color: theme.colors.textSecondary,
                fontSize: theme.typography.fontSize.sm 
              }}
            >
              Start your journey to financial freedom
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="firstName" 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: theme.colors.textPrimary,
                        fontWeight: theme.typography.fontWeight.medium 
                      }}
                    >
                      First Name
                    </label>
                    <input
                      {...register('firstName')}
                      type="text"
                      className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors"
                      style={errors.firstName ? errorInputStyle : inputStyle}
                      placeholder="First name"
                    />
                    {errors.firstName && (
                      <p 
                        className="mt-1 text-sm"
                        style={{ 
                          color: theme.colors.loss,
                          fontSize: theme.typography.fontSize.sm 
                        }}
                      >
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="lastName" 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: theme.colors.textPrimary,
                        fontWeight: theme.typography.fontWeight.medium 
                      }}
                    >
                      Last Name
                    </label>
                    <input
                      {...register('lastName')}
                      type="text"
                      className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors"
                      style={errors.lastName ? errorInputStyle : inputStyle}
                      placeholder="Last name"
                    />
                    {errors.lastName && (
                      <p 
                        className="mt-1 text-sm"
                        style={{ 
                          color: theme.colors.loss,
                          fontSize: theme.typography.fontSize.sm 
                        }}
                      >
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

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
                    placeholder="Create a password"
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

                <div>
                  <label 
                    htmlFor="confirmPassword" 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      color: theme.colors.textPrimary,
                      fontWeight: theme.typography.fontWeight.medium 
                    }}
                  >
                    Confirm Password
                  </label>
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors"
                    style={errors.confirmPassword ? errorInputStyle : inputStyle}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p 
                      className="mt-1 text-sm"
                      style={{ 
                        color: theme.colors.loss,
                        fontSize: theme.typography.fontSize.sm 
                      }}
                    >
                      {errors.confirmPassword.message}
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
                {loading ? 'Creating account...' : 'Create Account'}
              </button>

              <div className="text-center">
                <p 
                  className="text-sm"
                  style={{ 
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.fontSize.sm 
                  }}
                >
                  Already have an account?{' '}
                  <Link 
                    href="/auth/login" 
                    className="font-medium hover:underline transition-colors"
                    style={{ 
                      color: theme.colors.primary,
                      fontWeight: theme.typography.fontWeight.medium 
                    }}
                  >
                    Sign in
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