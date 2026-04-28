'use client';

import { useState, useEffect } from 'react';
import { Habit } from '@/types/habit';
import { getHabitsByUserId, getSession } from '@/lib/storage';
import HabitCard from './HabitCard';
import HabitForm from './HabitForm';

export default function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>();

  const loadHabits = () => {
    const session = getSession();
    if (session) {
      const userHabits = getHabitsByUserId(session.userId);
      setHabits(userHabits);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const handleCreateNew = () => {
    setEditingHabit(undefined);
    setShowForm(true);
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingHabit(undefined);
  };

  const handleSave = () => {
    loadHabits();
  };

  return (
    <div className="space-y-4">
      {/* Create button */}
      <button
        data-testid="create-habit-button"
        onClick={handleCreateNew}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-gray-400 hover:text-gray-700 transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
      >
        + Create New Habit
      </button>

      {/* Habits list or empty state */}
      {habits.length === 0 ? (
        <div
          data-testid="empty-state"
          className="text-center py-12 px-4"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No habits yet
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Create your first habit to start building consistency
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onUpdate={loadHabits}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* Habit form modal */}
      {showForm && (
        <HabitForm
          habit={editingHabit}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      )}
    </div>
  );
}