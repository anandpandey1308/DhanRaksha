"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  label?: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string; // e.g., ₹/mo
  placeholder?: string;
  min?: number;
  max?: number;
  helpText?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
};

// Format numbers in Indian numbering format without currency symbol
const formatINR = (v: number) => {
  if (Number.isNaN(v) || v === null || v === undefined) return '';
  try {
    return Math.round(v).toLocaleString('en-IN');
  } catch {
    return String(v);
  }
};

const parseToNumber = (raw: string) => {
  // keep only digits
  const digits = raw.replace(/[^0-9]/g, '');
  if (!digits) return 0;
  return Number(digits);
};

const CurrencyInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  suffix,
  placeholder = '0',
  min,
  max,
  helpText,
  disabled,
  required,
  name,
}) => {
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const display = useMemo(() => formatINR(value), [value]);

  useEffect(() => {
    if (!focused) setText(display);
  }, [display, focused]);

  const showValue = focused ? text : display;

  const onLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setText(next);
    const parsed = parseToNumber(next);
    if (min !== undefined && parsed < min) return onChange(min);
    if (max !== undefined && parsed > max) return onChange(max);
    onChange(parsed);
  };

  const onBlur = () => {
    setFocused(false);
    // normalize text using formatter
    setText(formatINR(value));
  };

  const id = useMemo(() => name || `currency-${Math.random().toString(36).slice(2, 8)}`,[name]);

  return (
    <label htmlFor={id} className="block text-sm">
      {label && (
        <span className="text-gray-700 dark:text-gray-200">{label}{required ? ' *' : ''}</span>
      )}
      <div className="mt-1 flex items-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-900/70 backdrop-blur focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-colors">
        <span className="pl-3 pr-2 text-gray-500 dark:text-gray-400 select-none">₹</span>
        <input
          id={id}
          ref={inputRef}
          inputMode="numeric"
          autoComplete="off"
          name={name}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          value={showValue}
          onChange={onLocalChange}
          onFocus={() => setFocused(true)}
          onBlur={onBlur}
          className="w-full bg-transparent px-1 py-2 outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
        />
        {suffix && (
          <span className="px-3 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{suffix}</span>
        )}
      </div>
      {helpText && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
    </label>
  );
};

export default CurrencyInput;
