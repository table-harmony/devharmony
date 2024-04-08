import type {
  UserDto,
  AccountDto,
  TokenDto,
  TwoFactorConfirmationDto,
} from "@/use-cases";
import { ColumnDef } from "@tanstack/react-table";

export interface Model<TData> {
  name: string;
  description: string;
  columns: ColumnDef<TData>[];
  getData: () => Promise<TData[]>;
}

export interface Models {
  user: Model<UserDto>;
  account: Model<AccountDto>;
  verification_token: Model<TokenDto>;
  two_factor_token: Model<TokenDto>;
  password_reset_token: Model<TokenDto>;
  two_factor_confirmation: Model<TwoFactorConfirmationDto>;
}
