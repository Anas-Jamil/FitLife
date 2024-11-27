import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  createdAt: string;
  ticketCount: number; 
};


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
