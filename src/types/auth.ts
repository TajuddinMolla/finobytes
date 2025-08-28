export type UserRole = "admin" | "merchant" | "member";

export interface User {
  name?: string;
  email?: string;
  phone?: string;
  storeName?: string;
  role: UserRole;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
}
