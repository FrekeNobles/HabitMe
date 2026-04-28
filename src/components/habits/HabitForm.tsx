'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Habit } from '@/types/habit';
import { validateHabitName } from '@/lib/validators';
import { addHabit, updateHabit } from '@/lib/storage';
import { getSession } from '@/lib/storage';

interface HabitFormProps {
  habit?: Habit;
  onClose: () => void;
  onSave: () => void;
}

export default function HabitForm({ habit, onClose, onSave }: HabitFormProps) {
  const [name, setName] = useState(habit?.name || '');
  const [description, setDescription] = useState(habit?.description || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!habit;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate habit name
    const validation = validateHabitName(name);
    if (!validation.valid) {
      setError(validation.error || 'Invalid habit name');
      setIsLoading(false);
      return;
    }

    const session = getSession();
    if (!session) {
      setError('No active session');
      setIsLoading(false);
      return;
    }

    try {
      if (isEditing) {
        // Update existing habit
        const updatedHabit: Habit = {
          ...habit,
          name: validation.value,
          description: description.trim(),
        };
        updateHabit(updatedHabit);
      } else {
        // Create new habit
        const newHabit: Habit = {
          id: crypto.randomUUID(),
          userId: session.userId,
          name: validation.value,
          description: description.trim(),
          frequency: 'daily',
          createdAt: new Date().toISOString(),
          completions: [],
        };
        addHabit(newHabit);
      }

      onSave();
      onClose();
    } catch (err) {
      setError('Failed to save habit');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-premium-lg w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {isEditing ? 'Edit Habit' : 'Create Habit'}
          </h2>
        </div>

        {/* Form */}
        <form data-testid="habit-form" onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Error message */}
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
              {error}
            </div>
          )}

          {/* Name field */}
          <div>
            <label
              htmlFor="habit-name-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Habit Name
            </label>
            <input
              id="habit-name-input"
              data-testid="habit-name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-smooth"
              placeholder="e.g., Drink Water"
              disabled={isLoading}
              maxLength={60}
            />
            <p className="mt-1.5 text-xs text-gray-500">
              {name.length}/60 characters
            </p>
          </div>

          {/* Description field */}
          <div>
            <label
              htmlFor="habit-description-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description (optional)
            </label>
            <textarea
              id="habit-description-input"
              data-testid="habit-description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-smooth resize-none"
              placeholder="Why is this habit important to you?"
              rows={3}
              disabled={isLoading}
            />
          </div>

          {/* Frequency field (read-only for now) */}
          <div>
            <label
              htmlFor="habit-frequency-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Frequency
            </label>
            <select
              id="habit-frequency-select"
              data-testid="habit-frequency-select"
              value="daily"
              disabled
              className="w-full px-4 py-2.5 border border-gray-200 rounded bg-gray-50 text-gray-600 cursor-not-allowed"
            >
              <option value="daily">Daily</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-medium rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-testid="habit-save-button"
              disabled={isLoading}
              className="flex-1 py-2.5 bg-black text-white font-medium rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}