/**
 * Calculates the current streak for a habit
 * Per TRD Section 9:
 * - completions contains YYYY-MM-DD strings
 * - remove duplicates before calculating
 * - sort by date before logic
 * - if today is not completed, current streak is 0
 * - if today is completed, count consecutive calendar days backwards from today
 * 
 * Examples:
 * - [] => 0
 * - [today] => 1
 * - [today, yesterday] => 2
 * - [yesterday] => 0
 * - [today, twoDaysAgo] => 1
 */
export function calculateCurrentStreak(
  completions: string[],
  today?: string
): number {
  // Get today's date in YYYY-MM-DD format
  const todayDate = today || new Date().toISOString().split('T')[0];

  // Remove duplicates and sort
  const uniqueDates = Array.from(new Set(completions)).sort();

  // If today is not completed, streak is 0
  if (!uniqueDates.includes(todayDate)) {
    return 0;
  }

  // Start counting from today backwards
  let streak = 0;
  let currentDate = new Date(todayDate);

  for (let i = uniqueDates.length - 1; i >= 0; i--) {
    const checkDate = currentDate.toISOString().split('T')[0];

    if (uniqueDates.includes(checkDate)) {
      streak++;
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      // Streak broken
      break;
    }
  }

  return streak;
}