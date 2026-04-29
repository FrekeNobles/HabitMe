import { describe, it, expect, beforeEach, vi } from 'vitest';
import { signup, login } from '@/lib/auth';
import { getSession, clearSession } from '@/lib/storage';

// Mock Next.js router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('auth flow', () => {
  beforeEach(() => {
    localStorage.clear();
    mockPush.mockClear();
  });

  it('submits the signup form and creates a session', () => {
    const result = signup('newuser@test.com', 'password123');
    
    expect(result.success).toBe(true);
    expect(result.user).toBeDefined();
    expect(result.user?.email).toBe('newuser@test.com');
    
    const session = getSession();
    expect(session).not.toBeNull();
    expect(session?.email).toBe('newuser@test.com');
  });

  it('shows an error for duplicate signup email', () => {
    // First signup
    signup('duplicate@test.com', 'password123');
    
    // Attempt duplicate signup
    const result = signup('duplicate@test.com', 'password456');
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('User already exists');
  });

  it('submits the login form and stores the active session', () => {
    // Create user first
    signup('loginuser@test.com', 'password123');
    clearSession();
    
    // Now login
    const result = login('loginuser@test.com', 'password123');
    
    expect(result.success).toBe(true);
    expect(result.user).toBeDefined();
    
    const session = getSession();
    expect(session).not.toBeNull();
    expect(session?.email).toBe('loginuser@test.com');
  });

  it('shows an error for invalid login credentials', () => {
    // Attempt login with non-existent user
    const result1 = login('nonexistent@test.com', 'password123');
    expect(result1.success).toBe(false);
    expect(result1.error).toBe('Invalid email or password');
    
    // Create user and try wrong password
    signup('rightuser@test.com', 'correctpassword');
    clearSession();
    
    const result2 = login('rightuser@test.com', 'wrongpassword');
    expect(result2.success).toBe(false);
    expect(result2.error).toBe('Invalid email or password');
  });
});