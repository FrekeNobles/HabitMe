import { VALIDATION_MESSAGES } from './constants';


export function validateHabitName(name: string): {
  valid: boolean;
  value: string;
  error: string | null;
} {
  const trimmedName = name.trim();

  // Check if empty
  if (trimmedName.length === 0) {
    return {
      valid: false,
      value: trimmedName,
      error: VALIDATION_MESSAGES.HABIT_NAME_REQUIRED,
    };
  }

  // Checks if habit name exceeds 60 characters
  if (trimmedName.length > 60) {
    return {
      valid: false,
      value: trimmedName,
      error: VALIDATION_MESSAGES.HABIT_NAME_TOO_LONG,
    };
  }

  // Valid
  return {
    valid: true,
    value: trimmedName,
    error: null,
  };
}