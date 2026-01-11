import {
  authCheckStatus,
  authCreateAccount,
  authLogin,
} from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interfaces/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage";
import { create } from "zustand";
export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?: User) => Promise<boolean>;
  createAccount: ({
    fullName,
    email,
    password,
  }: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,
  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      SecureStorageAdapter.deleteItem("token");
      return false;
    }

    set({ status: "authenticated", token: token, user: user });

    await SecureStorageAdapter.setItem("token", token);
    return true;
  },
  login: async (email: string, password: string): Promise<boolean> => {
    const resp = await authLogin(email, password);

    return get().changeStatus(resp?.token, resp?.user);
  },

  checkStatus: async (): Promise<void> => {
    if (get().user) return;

    const resp = await authCheckStatus();

    get().changeStatus(resp?.token, resp?.user);
  },

  logout: async (): Promise<void> => {
    SecureStorageAdapter.deleteItem("token");
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },

  createAccount: async ({ email, fullName, password }) => {
    const account = await authCreateAccount({ email, fullName, password });

    if (!account) return false;
    const { token, ...user } = account;

    return get().changeStatus(account.token, user);
  },
}));
