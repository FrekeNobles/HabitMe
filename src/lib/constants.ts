// localStorage keys 
export const STORAGE_KEYS = {
  USERS: 'habit-tracker-users',
  SESSION: 'habit-tracker-session',
  HABITS: 'habit-tracker-habits',
} as const;

// Auth error messages
export const AUTH_ERRORS = {
  USER_EXISTS: 'User already exists',
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_REQUIRED: 'Password is required',
} as const;

// Validation messages
export const VALIDATION_MESSAGES = {
  HABIT_NAME_REQUIRED: 'Habit name is required',
  HABIT_NAME_TOO_LONG: 'Habit name must be 60 characters or fewer',
} as const;