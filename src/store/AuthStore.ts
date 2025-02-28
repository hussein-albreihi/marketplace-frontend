import { create } from "zustand";

interface AuthState {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const storedUser = localStorage.getItem("user");
  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    login: (username: string) => {
      localStorage.setItem("user", JSON.stringify(username));
      set({ user: username });
    },
    logout: () => {
      localStorage.removeItem("user");
      set({ user: null });
    },
  };
});