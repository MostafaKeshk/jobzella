interface User {
  name: string;
  email: string;
  image: string;
  id: string;
}

interface TokenResponse {
  user: User;
  token: string;
}

export type ISession = TokenResponse | null;
