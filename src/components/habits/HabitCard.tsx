'use client';

import { useState } from 'react';
import { Habit } from '@/types/habit';
import { getHabitSlug } from '@/lib/slug';
import { calculateCurrentStreak } from '@/lib/streaks';
import { toggleHabitCompletion } from '@/lib/habits';
import { updateHabit, deleteHabit } from '@/lib/storage';

interface HabitCardProps {
  habit: Habit;
  onUpdate: () => void;
  onEdit: (habit: Habit) => void;
}

export default function HabitCard({ habit, onUpdate, onEdit }: HabitCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const slug = getHabitSlug(habit.name);
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completions.includes(today);
  const currentStreak = calculateCurrentStreak(habit.completions);

  const handleToggleComplete = () => {
    const updatedHabit = toggleHabitCompletion(habit, today);
    updateHabit(updatedHabit);
    onUpdate();
  };

  const handleDelete = () => {
    deleteHabit(habit.id);
    onUpdate();
  };

  return (
    <>
      <div
        data-testid={`habit-card-${slug}`}
        className="bg-white border border-gray-200 rounded-lg p-5 shadow-premium hover:shadow-premium-lg transition-smooth"
      >
        <div className="flex items-start justify-between gap-4">
          {/* Left: Habit info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {habit.name}
            </h3>
            {habit.description && (
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {habit.description}
              </p>
            )}

            {/* Streak display */}
            <div
              data-testid={`habit-streak-${slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full"
            >
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                {currentStreak} day{currentStreak !== 1 ? 's' : ''} streak
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col gap-2">
            {/* Complete button */}
            <button
              data-testid={`habit-complete-${slug}`}
              onClick={handleToggleComplete}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ${
                isCompletedToday
                  ? 'bg-black border-black'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              title={isCompletedToday ? 'Mark incomplete' : 'Mark complete'}
            >
              {isCompletedToday && (
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>

            {/* Edit button */}
            <button
              data-testid={`habit-edit-${slug}`}
              onClick={() => onEdit(habit)}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              title="Edit habit"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>

            {/* Delete button */}
            <button
              data-testid={`habit-delete-${slug}`}
              onClick={() => setShowDeleteConfirm(true)}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              title="Delete habit"
            >
              <svg
                className="w-4 h-4 text-gray-600 hover:text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-premium-lg w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Delete habit?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This will permanently delete "{habit.name}" and all its progress. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-medium rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-smooth"
              >
                Cancel
              </button>
              <button
                data-testid="confirm-delete-button"
                onClick={handleDelete}
                className="flex-1 py-2.5 bg-red-600 text-white font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-smooth"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}