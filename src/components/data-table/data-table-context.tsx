"use client";

import { createContext } from "react";
import { Table } from "@tanstack/react-table";

interface DataTableContext {
  table: Table<any>;
}

export const DataTableContext = createContext<DataTableContext>({
  table: {} as Table<any>,
});
