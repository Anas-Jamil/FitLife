import React, { useEffect, useRef } from "react";
import { ColumnDef } from "@tanstack/react-table";

export type Workout = {
  id: number;
  exercise: string;
  description: string | null;
  reps: number;
  sets: number;
};

export const columns: ColumnDef<Workout>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const ref = useRef<HTMLInputElement>(null);

      useEffect(() => {
        if (ref.current) {
          ref.current.indeterminate = table.getIsSomePageRowsSelected();
        }
      }, [table.getIsSomePageRowsSelected()]);

      return (
        <input
          type="checkbox"
          ref={ref}
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          aria-label="Select all rows"
        />
      );
    },
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "exercise",
    header: "Exercise",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description || "N/A",
  },
  {
    accessorKey: "reps",
    header: "Reps",
  },
  {
    accessorKey: "sets",
    header: "Sets",
  },
];
