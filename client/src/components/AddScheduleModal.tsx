"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export type AddToScheduleModalProps = {
  workouts: { id: number; exercise: string }[];
  daysOfWeek: string[];
  isOpen: boolean;
  onClose: () => void;
  onAddToSchedule: (workoutId: number, dayOfWeek: string) => Promise<void>;
};

export default function AddToScheduleModal({
  workouts,
  daysOfWeek,
  isOpen,
  onClose,
  onAddToSchedule,
}: AddToScheduleModalProps) {
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState("Monday");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedWorkoutId || !selectedDay) {
      alert("Please select a workout and a day.");
      return;
    }

    await onAddToSchedule(selectedWorkoutId, selectedDay);

    // Reset modal inputs
    setSelectedWorkoutId(null);
    setSelectedDay("Monday");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add to Schedule</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="workout" className="block text-sm font-semibold mb-2">
              Select Workout
            </label>
            <select
              id="workout"
              value={selectedWorkoutId ?? ""}
              onChange={(e) => setSelectedWorkoutId(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="" disabled>
                Choose a workout
              </option>
              {workouts.map((workout) => (
                <option key={workout.id} value={workout.id}>
                  {workout.exercise}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="day" className="block text-sm font-semibold mb-2">
              Select Day
            </label>
            <select
              id="day"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
