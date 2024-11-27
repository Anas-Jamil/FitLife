"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { DataTable } from "@/app/(dashboard)/adminPage/data-table";
import { columns, User } from "@/app/(dashboard)/adminPage/columns";
import { Spinner } from "./ui/spinner";

interface Ticket {
  id: string;
  title: string;
  description: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

async function fetchData(): Promise<Ticket[]> {
  try {
    const response = await fetch("/api/admin");
    if (!response.ok) {
      throw new Error("Failed to fetch tickets.");
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
}

async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch("/api/userFetch");
    if (!response.ok) {
      throw new Error("Failed to fetch users.");
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

async function deleteTicket(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/tickets?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete ticket.");
    }
  } catch (error) {
    console.error("Error deleting ticket:", error);
  }
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [data, setData] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedUsers, fetchedTickets] = await Promise.all([fetchUsers(), fetchData()]);
        setUsers(fetchedUsers);
        setData(fetchedTickets);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteTicket(id);
    setData((prevData) => prevData.filter((ticket) => ticket.id !== id));
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen"><Spinner/></div>;
  }

  return (
    <div className="w-full p-6 bg-gray-100 rounded-lg shadow-md border-gray-300">
      {/* User Data Table */}
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="w-full">
        <DataTable columns={columns} data={users} />
      </div>

      {/* Ticket List */}
      <h1 className="text-2xl font-bold mb-4 mt-8">User Tickets</h1>
      {data.length === 0 ? (
        <div>No tickets found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((ticket) => (
            <div
              key={ticket.id}
              className="p-4 border rounded-lg shadow-sm relative hover:shadow-md transition"
            >
              {/* Buttons aligned vertically in the top-right corner */}
              <div className="absolute top-2 right-2 flex flex-col space-y-2">
                <button
                  onClick={() => handleDelete(ticket.id)}
                  className="text-gray-500 hover:text-green-500"
                  title="Mark as resolved"
                >
                  <Check className="w-5 h-5" />
                </button>
              </div>
              {/* Ticket content */}
              <h2 className="text-lg font-semibold mb-1">{ticket.title}</h2>
              <p className="text-sm text-gray-700 mb-3">
                {ticket.description || "No description provided."}
              </p>
              <p className="text-sm text-gray-600">
                Submitted by: {ticket.user.firstName} {ticket.user.lastName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
