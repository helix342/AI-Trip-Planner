import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  users: { username: string; password: string }[];
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  users: [{ username: 'user', password: 'user' }],
  login: (username, password) => {
    const user = get().users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },
  signup: (username, password) => {
    const users = get().users;
    if (users.some((u) => u.username === username)) {
      return false;
    }
    set({ users: [...users, { username, password }], isAuthenticated: true });
    return true;
  },
  logout: () => set({ isAuthenticated: false }),
}));