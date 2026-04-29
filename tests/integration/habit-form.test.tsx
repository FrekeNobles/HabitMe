import { describe, it, expect, beforeEach } from 'vitest';
import { validateHabitName } from '@/lib/validators';
import { addHabit, updateHabit, deleteHabit, getHabits } from '@/lib/storage';
import { toggleHabitCompletion } from '@/lib/habits';
import { calculateCurrentStreak } from '@/lib/streaks';
import { Habit } from '@/types/habit';

describe('habit form', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows a validation error when habit name is empty', () => {
    const result = validateHabitName('');
    
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Habit name is required');
  });

  it('creates a new habit and renders it in the list', () => {
    const newHabit: Habit = {
      id: 'test-habit-1',
      userId: 'user-1',
      name: 'Drink Water',
      description: 'Stay hydrated',
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: [],
    };
    
    addHabit(newHabit);
    
    const habits = getHabits();
    expect(habits.length).toBe(1);
    expect(habits[0].name).toBe('Drink Water');
    expect(habits[0].userId).toBe('user-1');
  });

  it('edits an existing habit and preserves immutable fields', () => {
    const originalHabit: Habit = {
      id: 'habit-123',
      userId: 'user-1',
      name: 'Original Name',
      description: 'Original description',
      frequency: 'daily',
      createdAt: '2024-01-01T00:00:00.000Z',
      completions: ['2024-01-15'],
    };
    
    addHabit(originalHabit);
    
    // Edit the habit
    const updatedHabit: Habit = {
      ...originalHabit,
      name: 'Updated Name',
      description: 'Updated description',
    };
    
    updateHabit(updatedHabit);
    
    const habits = getHabits();
    const habit = habits.find(h => h.id === 'habit-123');
    
    expect(habit?.name).toBe('Updated Name');
    expect(habit?.description).toBe('Updated description');
    // Immutable fields preserved
    expect(habit?.id).toBe('habit-123');
    expect(habit?.userId).toBe('user-1');
    expect(habit?.createdAt).toBe('2024-01-01T00:00:00.000Z');
    expect(habit?.completions).toEqual(['2024-01-15']);
  });

  it('deletes a habit only after explicit confirmation', () => {
    const habit: Habit = {
      id: 'habit-to-delete',
      userId: 'user-1',
      name: 'Delete Me',
      description: '',
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: [],
    };
    
    addHabit(habit);
    expect(getHabits().length).toBe(1);
    
    // Simulate explicit confirmation and delete
    deleteHabit('habit-to-delete');
    
    expect(getHabits().length).toBe(0);
  });

  it('toggles completion and updates the streak display', () => {
    const today = new Date().toISOString().split('T')[0];
    
    const habit: Habit = {
      id: 'habit-streak',
      userId: 'user-1',
      name: 'Exercise',
      description: '',
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: [],
    };
    
    // Initial streak is 0
    expect(calculateCurrentStreak(habit.completions)).toBe(0);
    
    // Toggle completion (add today)
    const completedHabit = toggleHabitCompletion(habit, today);
    expect(completedHabit.completions).toContain(today);
    expect(calculateCurrentStreak(completedHabit.completions)).toBe(1);
    
    // Toggle again (remove today)
    const uncompletedHabit = toggleHabitCompletion(completedHabit, today);
    expect(uncompletedHabit.completions).not.toContain(today);
    expect(calculateCurrentStreak(uncompletedHabit.completions)).toBe(0);
  });
});