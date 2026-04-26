import { describe, it, expect } from 'vitest';
import { toggleHabitCompletion } from '@/lib/habits';
import { Habit } from '@/types/habit';

describe('toggleHabitCompletion', () => {
  const baseHabit: Habit = {
    id: '1',
    userId: 'user1',
    name: 'Drink Water',
    description: 'Stay hydrated',
    frequency: 'daily',
    createdAt: '2024-01-01T00:00:00.000Z',
    completions: [],
  };

  it('adds a completion date when the date is not present', () => {
    const date = '2024-01-15';
    const result = toggleHabitCompletion(baseHabit, date);

    expect(result.completions).toContain(date);
    expect(result.completions.length).toBe(1);
  });

  it('removes a completion date when the date already exists', () => {
    const date = '2024-01-15';
    const habitWithCompletion: Habit = {
      ...baseHabit,
      completions: [date],
    };

    const result = toggleHabitCompletion(habitWithCompletion, date);

    expect(result.completions).not.toContain(date);
    expect(result.completions.length).toBe(0);
  });

  it('does not mutate the original habit object', () => {
    const date = '2024-01-15';
    const original: Habit = {
      ...baseHabit,
      completions: [],
    };

    const result = toggleHabitCompletion(original, date);

    // Original should be unchanged
    expect(original.completions.length).toBe(0);

    // Result should have the new completion
    expect(result.completions.length).toBe(1);
    
    // They should be different objects
    expect(result).not.toBe(original);
  });

  it('does not return duplicate completion dates', () => {
    const date1 = '2024-01-15';
    const date2 = '2024-01-16';
    
    const habitWithDuplicates: Habit = {
      ...baseHabit,
      completions: [date1, date1, date2], // Intentional duplicates
    };

    const result = toggleHabitCompletion(habitWithDuplicates, date1);

    // Should remove duplicates
    const uniqueDates = Array.from(new Set(result.completions));
    expect(result.completions.length).toBe(uniqueDates.length);
    
    // Should only have date2 left
    expect(result.completions).toEqual([date2]);
  });
});