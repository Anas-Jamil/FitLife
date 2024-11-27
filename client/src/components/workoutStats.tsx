"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


interface DayStats {
  day: string;
  count: number;
}


async function fetchWorkoutStats(): Promise<DayStats[]> {
  const response = await fetch("/api/schedule");
  if (!response.ok) {
    throw new Error("Failed to fetch workout stats.");
  }
  const data = await response.json();

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const stats: DayStats[] = daysOfWeek.map((day) => ({
    day,
    count: data.data.filter((schedule: { dayOfWeek: string }) => schedule.dayOfWeek === day).length,
  }));

  return stats;
}

export default function WorkoutStatsPage() {
  const [stats, setStats] = useState<DayStats[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  
  const fetchAndSetStats = async () => {
    try {
      setIsLoading(true);
      const data = await fetchWorkoutStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching workout stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetStats();
  }, []);

  
  const chartData = {
    labels: stats.map((stat) => stat.day),
    datasets: [
      {
        label: "Workouts",
        data: stats.map((stat) => stat.count),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Workouts Per Day",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  
  if (stats.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold">No data available for workouts.</p>
          <Button onClick={fetchAndSetStats} className="mt-4 bg-blue-500 hover:bg-blue-600">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  
  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-4">
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}