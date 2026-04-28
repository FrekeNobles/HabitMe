'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signup } from '@/lib/auth';

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate inputs
    if (!email || !password) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
}

    // Attempt signup
    const result = signup(email, password);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Signup failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
          Create account
        </h1>
        <p className="text-gray-500">Start building better habits today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Error message */}
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}

        {/* Email field */}
        <div>
          <label
            htmlFor="auth-signup-email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="auth-signup-email"
            data-testid="auth-signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-smooth"
            placeholder="you@example.com"
            disabled={isLoading}
          />
        </div>

        {/* Password field */}
        <div>
          <label
            htmlFor="auth-signup-password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
            id="auth-signup-password"
            data-testid="auth-signup-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-smooth"
            placeholder="••••••••"
            disabled={isLoading}
          />

          <button
             type="button"
             onClick={() => setShowPassword((prev) => !prev)}
             disabled={isLoading}
             className="absolute  right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 disabled:opacity-50"
          >
               {showPassword ? "Hide" : "Show"}
          </button>

          </div>
          
          <p className="mt-1.5 text-xs text-gray-500">
            Must be at least 6 characters
          </p>
        </div>

        {/* Confirm Password field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-smooth"
              placeholder="••••••••"
              disabled={isLoading}
            />

            <button
              type="button"
              onClick={() => setshowConfirmPassword((prev) => !prev)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 disabled:opacity-50"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>


        {/* Submit button */}
        <button
          type="submit"
          data-testid="auth-signup-submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-black text-white font-medium rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-gray-900 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}