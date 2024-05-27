import "server-only";

import { db } from "@/db";
import { Session } from "@/db/schema";

import type { SessionDto } from "../types";

export function toDtoMapper(session: Session): SessionDto {
  return {
    id: session.id,
    userId: session.userId,
    expiresAt: session.expiresAt,
  };
}

export async function getSessions(): Promise<SessionDto[]> {
  const sessions = await db.query.sessions.findMany();

  return sessions.map(toDtoMapper);
}
