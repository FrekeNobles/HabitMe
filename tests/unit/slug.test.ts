import { describe, it, expect } from 'vitest';
import { getHabitSlug } from '@/lib/slug';

describe('getHabitSlug', () => {
  it('returns lowercase hyphenated slug for a basic habit name', () => {
    expect(getHabitSlug('Drink Water')).toBe('drink-water');
    expect(getHabitSlug('Read Books')).toBe('read-books');
    expect(getHabitSlug('Exercise Daily')).toBe('exercise-daily');
  });

  it('trims outer spaces and collapses repeated internal spaces', () => {
    expect(getHabitSlug('  Drink Water  ')).toBe('drink-water');
    expect(getHabitSlug('Drink    Water')).toBe('drink-water');
    expect(getHabitSlug('  Read   Books  ')).toBe('read-books');
  });

  it('removes non alphanumeric characters except hyphens', () => {
    expect(getHabitSlug('Drink Water!!!')).toBe('drink-water');
    expect(getHabitSlug('Read Books@Home')).toBe('read-bookshome');
    expect(getHabitSlug('Exercise (Daily)')).toBe('exercise-daily');
    expect(getHabitSlug('Code: 30 minutes')).toBe('code-30-minutes');
  });
});