import { Habit } from '@/types/habit';

export function toggleHabitCompletion(habit: Habit, date: string): Habit {
  // Create a new completions array (immutable)
  const currentCompletions = [...habit.completions];

  // Check if date exists
  const dateIndex = currentCompletions.indexOf(date);

  let newCompletions: string[];

  if (dateIndex === -1) {
    // Date doesn't exist, add it
    newCompletions = [...currentCompletions, date];
  } else {
    // Date exists, remove it
    newCompletions = currentCompletions.filter((d) => d !== date);
  }

  // Remove duplicates (just in case)
  const uniqueCompletions = Array.from(new Set(newCompletions));

  // Return new habit object (immutable)
  return {
    ...habit,
    completions: uniqueCompletions,
  };
}