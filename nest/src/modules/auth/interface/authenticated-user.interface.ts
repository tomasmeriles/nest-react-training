export interface AuthenticatedUser {
  id: number;

  email: string;

  name: string;

  accessToken: string;
}
