"use client"; // This component is client-side
import { useEffect, useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // Adjust the import path based on your project structure
import { Trash } from "lucide-react";
import { Spinner } from '@/components/ui/spinner';

type NutritionItem = {
  id: number;
  food: string;
  calories: number;
  proteins: number;
};

type MealPlanItem = {
  id: number;
  mealTime: string;
  dayOfWeek: string;
  nutrition: NutritionItem;
};

export default function MealPlan() {
  const [mealPlans, setMealPlans] = useState<MealPlanItem[]>([]);
  const [nutritionItems, setNutritionItems] = useState<NutritionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNutritionId, setSelectedNutritionId] = useState<number | null>(null);
  const [selectedMealTime, setSelectedMealTime] = useState<string>("Breakfast");
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [currentDate, setCurrentDate] = useState<string>("");

  const fetchMealPlans = async () => {
    try {
      const response = await fetch("/api/mealPlan");
      if (!response.ok) {
        throw new Error("Failed to fetch meal plans");
      }
      const data = await response.json();
      setMealPlans(data.data || []); // Ensure data structure is handled
    } catch (error) {
      console.error("Error fetching meal plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNutritionItems = async () => {
    try {
      const response = await fetch("/api/nutrition");
      if (!response.ok) {
        throw new Error("Failed to fetch nutrition items");
      }
      const data = await response.json();
      setNutritionItems(data.data || []); // Ensure data structure is handled
    } catch (error) {
      console.error("Error fetching nutrition items:", error);
    }
  };

  const handleAddMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNutritionId) {
      alert("Please select a nutrition item.");
      return;
    }

    try {
      const response = await fetch("/api/mealPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nutritionId: selectedNutritionId,
          mealTime: selectedMealTime,
          dayOfWeek: selectedDay,
        }),
      });

      if (response.ok) {
        await fetchMealPlans(); // Re-fetch meal plans to update the UI
        setIsModalOpen(false);
        setSelectedNutritionId(null);
        setSelectedMealTime("Breakfast");
        setSelectedDay("Monday");
      } else {
        throw new Error("Failed to add meal.");
      }
    } catch (error) {
      console.error("Error adding meal:", error);
      alert("Failed to add meal. Please try again.");
    }
  };

  const handleDeleteMealPlan = async (mealId: number) => {
    try {
      const response = await fetch(`/api/mealPlan?id=${mealId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted meal plan from state
        setMealPlans((prev) => prev.filter((meal) => meal.id !== mealId));
      } else {
        throw new Error("Failed to delete meal plan.");
      }
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      alert("Failed to delete meal plan. Please try again.");
    }
  };

  useEffect(() => {
    // Set the current date on component mount
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);

    // Fetch data for meal plans and nutrition items
    fetchMealPlans();
    fetchNutritionItems();
  }, []);

  if (loading) {
    return <div><Spinner/></div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Meal Plan</h1>
      <p className="text-md text-gray-600 mb-4">{currentDate}</p>

      {/* Add Meal Button */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition font-semibold"
        >
          Add Item
        </button>
      </div>

      {/* Accordion */}
      <Accordion type="multiple" defaultValue={["Breakfast", "Lunch", "Dinner"]} className="space-y-4">
        {["Breakfast", "Lunch", "Dinner"].map((mealTime) => {
          // Calculate total calories for this mealTime
          const totalCalories = mealPlans
            .filter((meal) => meal.mealTime === mealTime)
            .reduce((sum, meal) => sum + Number(meal.nutrition.calories || 0), 0);

          return (
            <AccordionItem key={mealTime} value={mealTime}>
              <AccordionTrigger>
                {mealTime}{" "}
                <span className="text-gray-600 text-sm font-normal">
                  Total Calories: {totalCalories}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {mealPlans
                  .filter((meal) => meal.mealTime === mealTime)
                  .map((meal) => (
                    <div
                      key={meal.id}
                      className="p-4 bg-gray-200 border rounded-lg shadow-sm mb-2 relative"
                    >
                      {/* Meal Details */}
                      <div>
                        <p className="font-semibold">{meal.nutrition.food}</p>
                        <p className="text-sm text-gray-600">
                          Calories: {meal.nutrition.calories}
                        </p>
                        <p className="text-sm text-gray-600">
                          Protein: {meal.nutrition.proteins}
                        </p>
                        <p className="text-sm text-gray-600">Day: {meal.dayOfWeek}</p>
                      </div>

                      {/* Trash Icon */}
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() => handleDeleteMealPlan(meal.id)}
                          className="hover:text-red-500 transition"
                        >
                          <Trash size={19} />
                        </button>
                      </div>
                    </div>
                  ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Meal</h2>
            <form onSubmit={handleAddMeal}>
              {/* Select Nutrition Item */}
              <div className="mb-4">
                <label htmlFor="nutrition" className="block text-sm font-semibold mb-2">
                  Select Food Item:
                </label>
                <select
                  id="nutrition"
                  value={selectedNutritionId ?? ""}
                  onChange={(e) => setSelectedNutritionId(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="" disabled>
                    Choose an item
                  </option>
                  {nutritionItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.food} ({item.calories} kcal)
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Meal Time */}
              <div className="mb-4">
                <label htmlFor="mealTime" className="block text-sm font-semibold mb-2">
                  Meal Time:
                </label>
                <select
                  id="mealTime"
                  value={selectedMealTime}
                  onChange={(e) => setSelectedMealTime(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>

              {/* Select Day */}
              <div className="mb-4">
                <label htmlFor="dayOfWeek" className="block text-sm font-semibold mb-2">
                  Day of the Week:
                </label>
                <select
                  id="dayOfWeek"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                    (day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
