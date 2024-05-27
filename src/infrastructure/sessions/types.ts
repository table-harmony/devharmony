export type SessionDto = {
  id: string;
  userId: string;
  expiresAt: Date;
};

export type GetSessions = () => Promise<SessionDto[]>;
