import { ColumnDef } from "@tanstack/react-table";

// Define the user type with ticketCount
export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  createdAt: string;
  ticketCount: number; // New field for ticket count
};

// Define the columns
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "isAdmin",
    header: "Admin",
    cell: ({ row }) => (row.original.isAdmin ? "Yes" : "No"),
  },
  {
    accessorKey: "ticketCount",
    header: "Tickets",
    cell: ({ row }) => row.original.ticketCount,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
];
