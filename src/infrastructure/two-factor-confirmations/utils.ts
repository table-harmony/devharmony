import { TwoFactorConfirmationEntity } from "./entity";
import {
  CreateTwoFactorConfirmationDto,
  TwoFactorConfirmationDto,
} from "./types";

export function TwoFactorConfirmationToDto(
  confirmation: TwoFactorConfirmationEntity
): TwoFactorConfirmationDto {
  const id = confirmation.getId(),
    userId = confirmation.getUserId();

  if (!id || !userId) throw new Error("Two factor confirmation expected data");

  return {
    id: id,
    userId: userId,
  };
}

export function TwoFactorConfirmationToCreateDto(
  confirmation: TwoFactorConfirmationEntity
): CreateTwoFactorConfirmationDto {
  const userId = confirmation.getUserId();

  if (!userId) throw new Error("Two factor confirmation expected user id");

  return {
    userId: userId,
  };
}
