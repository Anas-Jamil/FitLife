"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns, Workout } from "@/components/ui/columns";
import { useState, useEffect } from "react";
import { Spinner } from "./ui/spinner";

async function fetchData(): Promise<Workout[]> {
  try {
    const response = await fetch("/api/workouts");
    if (!response.ok) {
      throw new Error("Failed to fetch workouts.");
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
}

export default function ItemsPage() {
  const [data, setData] = useState<Workout[]>([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      const workouts = await fetchData();
      setData(workouts);
    };

    loadWorkouts();
  }, []);

  const handleDelete = async (selectedRows: Workout[]) => {
    const ids = selectedRows.map((row) => row.id);

    try {
      for (const id of ids) {
        await fetch(`/api/workouts?id=${id}`, {
          method: "DELETE",
        });
      }

      // Update the table data after deletion
      setData((prev) => prev.filter((item) => !ids.includes(item.id)));
    } catch (err) {
      console.error("Failed to delete workouts:", err);
    }
  };

  const handleAddWorkout = async (newWorkout: Workout) => {
    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkout),
      });

      if (!response.ok) {
        throw new Error("Failed to add workout.");
      }

      const addedWorkout = await response.json();

      // Update the table data with the new workout
      setData((prev) => [...prev, addedWorkout.data]);
    } catch (err) {
      console.error("Failed to add workout:", err);
    }
  };

 

  return (
    <div>
      {/* DataTable Section */}
      <h1 className="text-2xl font-bold mb-4">Your Schedule</h1>
      <div className="p-4 shadow-md bg-gray-100 rounded-md border border-gray-300">
        <h2 className="text-xl font-bold mb-4">Workouts</h2>
        <DataTable
          columns={columns}
          data={data}
          onDelete={handleDelete}
          onAddWorkout={handleAddWorkout}
        />
      </div>
    </div>
  );
}
