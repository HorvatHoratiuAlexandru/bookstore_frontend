export interface UserAuthData {
  uid: string | null;
  isLoggedIn: boolean;
  token: string | null;
  refreshToken: string | null;
}
