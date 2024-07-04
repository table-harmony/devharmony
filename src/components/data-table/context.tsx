"use client";

import { createContext } from "react";
import { Table } from "@tanstack/react-table";

interface TableContextValue {
  table: Table<any>;
}

export const TableContext = createContext<TableContextValue>({
  table: {} as Table<any>,
});
