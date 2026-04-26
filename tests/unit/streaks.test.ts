import { describe, it, expect } from 'vitest';
import { calculateCurrentStreak } from '@/lib/streaks';

describe('calculateCurrentStreak', () => {
  it('returns 0 when completions is empty', () => {
    expect(calculateCurrentStreak([])).toBe(0);
    expect(calculateCurrentStreak([], '2024-01-15')).toBe(0);
  });

  it('returns 0 when today is not completed', () => {
    const today = '2024-01-15';
    const yesterday = '2024-01-14';
    
    expect(calculateCurrentStreak([yesterday], today)).toBe(0);
    expect(calculateCurrentStreak(['2024-01-10', '2024-01-11'], today)).toBe(0);
  });

  it('returns the correct streak for consecutive completed days', () => {
    const today = '2024-01-15';
    const yesterday = '2024-01-14';
    const twoDaysAgo = '2024-01-13';
    const threeDaysAgo = '2024-01-12';

    // Just today
    expect(calculateCurrentStreak([today], today)).toBe(1);

    // Today and yesterday
    expect(calculateCurrentStreak([today, yesterday], today)).toBe(2);

    // 4 consecutive days
    expect(calculateCurrentStreak(
      [today, yesterday, twoDaysAgo, threeDaysAgo],
      today
    )).toBe(4);
  });

  it('ignores duplicate completion dates', () => {
    const today = '2024-01-15';
    const yesterday = '2024-01-14';

    // Duplicates should be removed
    expect(calculateCurrentStreak([today, today, yesterday], today)).toBe(2);
    expect(calculateCurrentStreak([today, today, today], today)).toBe(1);
  });

  it('breaks the streak when a calendar day is missing', () => {
    const today = '2024-01-15';
    const yesterday = '2024-01-14';
    const twoDaysAgo = '2024-01-13';
    const fourDaysAgo = '2024-01-11'; // Gap at 3 days ago

    // Should count only today and yesterday, break at missing day
    expect(calculateCurrentStreak([today, yesterday, fourDaysAgo], today)).toBe(2);

    // Only today (gap at yesterday)
    expect(calculateCurrentStreak([today, twoDaysAgo], today)).toBe(1);
  });
});