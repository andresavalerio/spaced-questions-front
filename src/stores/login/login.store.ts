import { create } from "zustand";
import { User, SetUser } from "../../types/User";

console.log(
  create<User & SetUser>((set) => ({
    username: "",
    setUser: (username) => set({ username: username }),
  }))
);

export const useLoginStore = create<User & SetUser>((set) => ({
  username: "",
  setUser: (username) => set({ username: username }),
}));
