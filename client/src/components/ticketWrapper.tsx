"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function TicketWrapper() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit ticket");
      }

      toast({
        title: "Success",
        description: "Ticket has been submitted successfully! Thanks!",
      });

      setTitle("");
      setDescription("");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col w-8/12 bg-white rounded-lg mx-auto shadow-md overflow-hidden">
        <div className="w-full bg-gray-200 p-6">
          <h1 className="text-3xl font-semibold text-center">Submit a Ticket</h1>
          <p className="mt-4 text-center text-sm">
            Found an issue? Need help? Send in a support ticket!
          </p>
        </div>
        <form className="p-4" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-semibold mb-4">Ticket Form</h1>

          <div className="w-full mb-4 px-4">
            <label className="font-semibold mb-1 text-lg">Ticket Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-3 px-4 rounded-lg border-2 bg-white border-gray-300 focus:outline-none focus:border-blue-500 transition"
              placeholder="Enter ticket title..."
              required
            />
          </div>

          <div className="w-full mb-4 px-4">
            <label className="font-semibold mb-1 text-lg">Ticket Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full py-3 px-4 rounded-lg border-2 bg-white border-gray-300 focus:outline-none focus:border-blue-500 transition"
              placeholder="Enter ticket description..."
              rows={4}
              required
            />
          </div>

          <div className="mb-4 px-4">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded-lg ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
