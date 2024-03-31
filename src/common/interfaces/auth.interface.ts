export interface UserAuthData {
  uid: string;
  isLoggedIn: boolean;
  token: string | null;
  refreshToken: string | null;
}
