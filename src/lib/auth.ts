import { User, Session } from '@/types/auth';
import { AUTH_ERRORS } from './constants';
import { getUsers, addUser, findUserByEmail, saveSession, clearSession } from './storage';

// Auth utilities for signup, login, logout
 
export function signup(email: string, password: string): {
  success: boolean;
  error?: string;
  user?: User;
} {
  // Check if user already exists
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return {
      success: false,
      error: AUTH_ERRORS.USER_EXISTS,
    };
  }

  // Create new user
  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    password, //i'm deciding to leave the password unhashed
    createdAt: new Date().toISOString(),
  };

  addUser(newUser);

  // Create session
  const session: Session = {
    userId: newUser.id,
    email: newUser.email,
  };
  saveSession(session);

  return {
    success: true,
    user: newUser,
  };
}

export function login(email: string, password: string): {
  success: boolean;
  error?: string;
  user?: User;
} {
  const user = findUserByEmail(email);

  // to check if a user exists and his/her password matches
  if (!user || user.password !== password) {
    return {
      success: false,
      error: AUTH_ERRORS.INVALID_CREDENTIALS,
    };
  }

  // Create session
  const session: Session = {
    userId: user.id,
    email: user.email,
  };
  saveSession(session);

  return {
    success: true,
    user,
  };
}

export function logout(): void {
  clearSession();
}