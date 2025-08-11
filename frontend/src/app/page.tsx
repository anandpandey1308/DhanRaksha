'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">DhanRaksha — Finance Planning & Goals Tracker</h1>
        <p className="text-gray-300">Offline-first planner for goals, investments, budgeting, and 5-year projections. Preloaded with your data. No daily expense tracker.</p>
        <div className="flex items-center justify-center space-x-4">
          <Link href="/dashboard" className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500">Open Dashboard</Link>
          <a href="https://github.com/" target="_blank" className="px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10">Read Docs</a>
        </div>
      </div>
    </div>
  );
}
