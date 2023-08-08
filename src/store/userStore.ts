import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  username: string | null;
  email: string | null;
  imageUrl: string | null;
  accessToken: string | null;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>(
  persist(
    (set) => ({
      user: {
        username: null,
        email: null,
        imageUrl: null,
        accessToken: null,
      },
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: { username: null, email: null, imageUrl: null, accessToken: null } }),
    }),
    {
      name: "user-storage", // unique name
      // Optional: By default, 'localStorage' is used. If you want to use sessionStorage, you can do so.
      // storage: createJSONStorage(() => sessionStorage)
    }
  )
);
