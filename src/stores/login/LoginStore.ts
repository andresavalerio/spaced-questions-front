import { create } from "zustand";
import { User, SetUser } from "../../types/User";
import {
  ILoginServiceProvider,
  LoginService,
  LoginServiceProvider,
} from "../../services/login/LoginService";

export const createLoginStore = (provider: ILoginServiceProvider) => {
  const service = new LoginService(provider);

  return create<User & SetUser>((set) => ({
    username: "",
    setUser: (username) => {
      service
        .verifyUser(username)
        .then((res) => set({ username: res.userData?.username }));
    },
  }));
};

export const useLoginStore = createLoginStore(new LoginServiceProvider());
