import { create } from "zustand";
import { IUserService, IUserStore } from "../../types/User";
import { UserService } from "../../services/user/UserService";
import { UserClient } from "../../clients/user/UserClient";

type UserStoreSetter = (
  partial:
    | IUserStore
    | Partial<IUserStore>
    | ((state: IUserStore) => IUserStore | Partial<IUserStore>),
  replace?: boolean | undefined
) => void;

const setError = (set: UserStoreSetter, error: boolean) =>
  set({ loading: false, error });

export const createUserStore = (userService: IUserService) => {
  return create<IUserStore>((set) => ({
    user: null,
    error: false,
    loading: false,
    async createUser(data) {
      set({ loading: true });

      try {
        await userService.createUser(data);

        setError(set, false);
      } catch (error) {
        setError(set, true);
      }
    },

    async loginUser(login, password) {
      set({ loading: true });

      try {
        const userData = await userService.loginUser(login, password);

        if (!userData) return setError(set, true);

        set({ user: userData, error: false, loading: false });
      } catch (error) {
        setError(set, true);
      }
    },
  }));
};

export const useLoginStore = createUserStore(
  new UserService(new UserClient(), "keyplace")
);
