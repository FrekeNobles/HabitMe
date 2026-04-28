'use client';

import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/storage';
import { logout } from '@/lib/auth';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import HabitList from '@/components/habits/HabitList';

export default function DashboardPage() {
  const router = useRouter();
  const session = getSession();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <div data-testid="dashboard-page" className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              {/* Logo and title */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white rounded-full" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Habit Tracker
                  </h1>
                  {session && (
                    <p className="text-xs text-gray-500">{session.email}</p>
                  )}
                </div>
              </div>

              {/* Logout button */}
              <button
                data-testid="auth-logout-button"
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-smooth"
              >
                Sign out
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
          {/* Page title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              My Habits
            </h2>
            <p className="text-sm text-gray-500">
              Track your daily progress and build consistency
            </p>
          </div>

          {/* Habit list */}
          <HabitList />
        </main>

        {/* Footer */}
        <footer className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
          <div className="text-center text-sm text-gray-400">
            <p>© 2026 HabitMe. Built with discipline by Freke Nobles.</p>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}