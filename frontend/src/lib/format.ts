// filepath: frontend/src/lib/format.ts
// Utilities for consistent INR currency and Indian locale formatting across the app

export const formatINR = (value: number, options: Intl.NumberFormatOptions = {}) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
};

export const formatINRCompact = (value: number, options: Intl.NumberFormatOptions = {}) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    maximumFractionDigits: 1,
    ...options,
  }).format(value);
};

export const formatNumberIN = (value: number, options: Intl.NumberFormatOptions = {}) => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
};

export const formatDateIN = (date: string | number | Date, options?: Intl.DateTimeFormatOptions) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', options);
};

export const parseINRNumber = (text: string): number => {
  if (!text) return 0;
  // Remove everything except digits and decimal separator
  const cleaned = text.replace(/[^0-9.]/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
};
