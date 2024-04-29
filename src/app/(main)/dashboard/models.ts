import { getUsers, getUsersUseCase, UserDto } from "@/infrastructure/users";

import { ColumnDef } from "@tanstack/react-table";

import { user } from "./_components/columns";

export interface Model<TData> {
  name: string;
  description: string;
  columns: ColumnDef<TData>[];
  getData: () => Promise<TData[]>;
}

export interface Models {
  user: Model<UserDto>;
}

export const models: Models = {
  user: {
    name: "Users",
    description: "Effortlessly manage, edit, and delete user information.",
    columns: user,
    getData: async () => await getUsersUseCase({ getUsers: getUsers }),
  },
};
