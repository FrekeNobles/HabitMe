
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