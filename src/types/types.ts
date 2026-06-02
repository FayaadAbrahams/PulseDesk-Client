export interface User {
  fullName: string;
  email: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  loginUser: (email: string, password: string) => Promise<any>;
  registerUser: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export enum UserRole {
  Customer = "Customer",
  Agent = "Agent",
  Admin = "Admin",
}

export interface SideBarState {
  sidebar: {
    isOpen: boolean;
  };
}
