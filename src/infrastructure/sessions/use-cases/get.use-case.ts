import { GetSessions } from "../types";

export async function getSessionsUseCase(context: {
  getSessions: GetSessions;
}) {
  const sessions = await context.getSessions();
  return sessions;
}
