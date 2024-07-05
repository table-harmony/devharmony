import { deleteSession, getSessions } from "./data-access";

export async function getSessionsUseCase() {
  return await getSessions();
}

export async function deleteSessionUseCase(sessionId: string) {
  await deleteSession(sessionId);
}
