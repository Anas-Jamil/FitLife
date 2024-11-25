"use client";

import { useState, useEffect } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Spinner } from '@/components/ui/spinner';

type Workout = {
  id: number;
  exercise: string;
  description: string;
  reps: number;
  sets: number;
};

type Schedule = {
  id: number;
  workoutId: number;
  dayOfWeek: string;
};

async function fetchWorkouts(): Promise<Workout[]> {
  const response = await fetch("/api/workouts");
  if (!response.ok) {
    throw new Error("Failed to fetch workouts.");
  }
  const data = await response.json();
  return data.data || [];
}

async function fetchSchedules(): Promise<Schedule[]> {
  const response = await fetch("/api/schedule");
  if (!response.ok) {
    throw new Error("Failed to fetch schedules.");
  }
  const data = await response.json();
  return data.data || [];
}

async function addToSchedule(workoutId: number, dayOfWeek: string) {
  const response = await fetch("/api/schedule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ workoutId, dayOfWeek }), // Correctly use `dayOfWeek`
  });

  const responseData = await response.json();
  console.log("API Response:", responseData);

  if (!response.ok) {
    throw new Error("Failed to add to schedule.");
  }
}

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    const loadData = async () => {
      const fetchedWorkouts = await fetchWorkouts();
      const fetchedSchedules = await fetchSchedules();
      setWorkouts(fetchedWorkouts);
      setSchedules(fetchedSchedules);
    };

    loadData();
  }, []);

  const getWorkoutsForDay = (day: string) => {
    return schedules
      .filter((schedule) => schedule.dayOfWeek === day)
      .map((schedule) => workouts.find((workout) => workout.id === schedule.workoutId))
      .filter(Boolean) as Workout[];
  };

  return (
    <div>
      {/* Weekly Schedule Accordion Section */}
      <h1 className="text-2xl font-bold mb-4">Your Schedule</h1>
      <div className="mt-6">
   
          <Button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-600">
            + Add to Schedule
          </Button>
       
        <Accordion type="multiple" defaultValue={["Monday", "Tuesday"]} className="space-y-4">
          {daysOfWeek.map((day) => {
            const dayWorkouts = getWorkoutsForDay(day);

            return (
              <AccordionItem key={day} value={day}>
                <AccordionTrigger>
                  {day}{" "}
                  <span className="text-gray-600 text-sm font-normal">
                    {dayWorkouts.length} Workouts
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {dayWorkouts.length > 0 ? (
                    dayWorkouts.map((workout) => (
                      <div
                        key={workout.id}
                        className="p-4 bg-gray-200 border rounded-lg shadow-sm mb-2 relative"
                      >
                        <div>
                          <p className="font-semibold">Exercise: {workout.exercise}</p>
                          <p className="text-sm text-gray-600">Description: {workout.description}</p>
                          <p className="text-sm text-gray-600">Reps: {workout.reps}</p>
                          <p className="text-sm text-gray-600">Sets: {workout.sets}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-600">No workouts scheduled for {day}.</div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add to Schedule</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const workoutId = parseInt((e.target as any).workoutId.value);
                const dayOfWeek = (e.target as any).dayOfWeek.value;

                await addToSchedule(workoutId, dayOfWeek);

                const updatedSchedules = await fetchSchedules();
                setSchedules(updatedSchedules);
                setIsModalOpen(false);
              }}
            >
              <div className="mb-4">
                <label htmlFor="workoutId" className="block text-sm font-semibold mb-2">
                  Select Workout:
                </label>
                <select id="workoutId" name="workoutId" className="w-full px-3 py-2 border rounded-lg">
                  {workouts.map((workout) => (
                    <option key={workout.id} value={workout.id}>
                      {workout.exercise}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="dayOfWeek" className="block text-sm font-semibold mb-2">
                  Select Day:
                </label>
                <select id="dayOfWeek" name="dayOfWeek" className="w-full px-3 py-2 border rounded-lg">
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  Add to Schedule
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
