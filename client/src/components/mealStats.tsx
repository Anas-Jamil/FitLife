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


interface MealStats {
  meal: string;
  calories: number;
}


async function fetchMealStats(): Promise<MealStats[]> {
  const response = await fetch("/api/mealPlan");
  if (!response.ok) {
    throw new Error("Failed to fetch meal stats.");
  }
  const data = await response.json();

  const mealTypes = ["Breakfast", "Lunch", "Dinner"];
  const stats: MealStats[] = mealTypes.map((meal) => ({
    meal,
    calories: data.data
      .filter((mealPlan: { mealTime: string }) => mealPlan.mealTime === meal)
      .reduce(
        (sum: number, mealPlan: { nutrition: { calories: number } }) => 
          sum + (mealPlan.nutrition.calories || 0),
        0 
      ),
  }));

  return stats;
}

export default function MealStatsPage() {
  const [stats, setStats] = useState<MealStats[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const fetchAndSetStats = async () => {
    try {
      setIsLoading(true);
      const data = await fetchMealStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching meal stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetStats();
  }, []);

 
  const chartData = {
    labels: stats.map((stat) => stat.meal),
    datasets: [
      {
        label: "Calories",
        data: stats.map((stat) => stat.calories),
        backgroundColor: ["#FFB6C1", "#FFD700", "#98FB98"], 
        borderColor: ["#FF69B4", "#FFA500", "#32CD32"],
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
        text: "Calories Per Meal",
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
          <div className="text-left">
            <p className="text-lg font-semibold">No data available for meals.</p>
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
