export class AccountEntity {
  private userId: string;
  private type: string;
  private provider: string;
  private providerAccountId: string;
  private refresh_token: string | null;
  private access_token: string | null;
  private expires_at: number | null;
  private token_type: string | null;
  private scope: string | null;
  private id_token: string | null;
  private session_state: string | null;

  constructor({
    userId,
    type,
    provider,
    providerAccountId,
    refresh_token,
    access_token,
    expires_at,
    token_type,
    scope,
    id_token,
    session_state,
  }: {
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
  }) {
    this.userId = userId;
    this.type = type;
    this.provider = provider;
    this.providerAccountId = providerAccountId;
    this.refresh_token = refresh_token;
    this.access_token = access_token;
    this.expires_at = expires_at;
    this.token_type = token_type;
    this.scope = scope;
    this.id_token = id_token;
    this.session_state = session_state;
  }

  getData() {
    return {
      userId: this.userId,
      type: this.type,
      provider: this.provider,
      providerAccountId: this.providerAccountId,
      refresh_token: this.refresh_token,
      access_token: this.access_token,
      expires_at: this.expires_at,
      token_type: this.token_type,
      scope: this.scope,
      id_token: this.id_token,
      session_state: this.session_state,
    };
  }
}
