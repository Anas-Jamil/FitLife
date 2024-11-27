"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Flame } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function GymTrackerPage() {
  const [streak, setStreak] = useState<number>(0);
  const [lastCheckedDate, setLastCheckedDate] = useState<string | null>(null);
  const [isCheckboxEnabled, setIsCheckboxEnabled] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const storedStreak = localStorage.getItem("gymStreak");
    const storedLastDate = localStorage.getItem("lastCheckedDate");

    if (storedStreak) {
      setStreak(Number(storedStreak));
    }

    if (storedLastDate) {
      setLastCheckedDate(storedLastDate);
      checkCheckboxState(storedLastDate);
    }
  }, []);

  const checkCheckboxState = (lastDate: string) => {
    const lastChecked = new Date(lastDate);
    const now = new Date();
    const differenceInSeconds = Math.floor((now.getTime() - lastChecked.getTime()) / 1000);

    const totalLockTime = 14 * 60 * 60;

    if (differenceInSeconds >= totalLockTime) {
      setIsCheckboxEnabled(true);
      setTimeRemaining(null);
    } else {
      setIsCheckboxEnabled(false);
      setTimeRemaining(totalLockTime - differenceInSeconds);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timeRemaining !== null && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    }

    if (timeRemaining === 0) {
      setIsCheckboxEnabled(true);
      setTimeRemaining(null);
    }

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "00:00:00";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleCheckboxClick = () => {
    if (!isCheckboxEnabled) return;

    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    const now = new Date();
    const lastChecked = lastCheckedDate ? new Date(lastCheckedDate) : null;

    if (lastChecked) {
      const differenceInDays = Math.floor((now.getTime() - lastChecked.getTime()) / (1000 * 60 * 60 * 24));

      if (differenceInDays <= 2) {
        setStreak((prevStreak) => prevStreak + 1);
      } else {
        setStreak(1);
      }
    } else {
      setStreak(1);
    }

    const currentDateString = now.toISOString();
    setLastCheckedDate(currentDateString);
    localStorage.setItem("lastCheckedDate", currentDateString);

    setIsCheckboxEnabled(false);
    setTimeRemaining(14 * 60 * 60);
    localStorage.setItem("gymStreak", String(streak + 1));
  };

  return (
    <div className="flex justify-end">
      <div className="flex flex-col items-center justify-center rounded-2xl p-8 shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white w-80">
        <h1 className="text-4xl font-bold">Gym Streak Tracker</h1>
        <div className="flex flex-col items-center">
          {isCheckboxEnabled ? (
            <button
              onClick={handleCheckboxClick}
              className={`w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-transform ${
                isAnimating ? "scale-110 animate-bounce" : ""
              }`}
            >
              <CheckCircle size={48} />
            </button>
          ) : (
            <div className="w-24 h-24 bg-gray-500 rounded-full flex items-center justify-center shadow-lg">
              <Spinner />
            </div>
          )}
          <p className="mt-4 text-lg font-semibold">
            {isCheckboxEnabled
              ? "Mark your gym day!"
              : `Wait ${formatTime(timeRemaining)} to mark your next day!`}
          </p>
        </div>
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold flex items-center">
            <Flame className="mr-2 text-yellow-400" /> Streak: {streak} days
          </p>
          <p className="text-sm text-gray-300 mt-2">
            Remember, you have a 2-day rest grace period!
          </p>
        </div>
      </div>
    </div>
  );
}
