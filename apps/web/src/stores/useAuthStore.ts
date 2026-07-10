import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type User, type Department, type Position } from "@/generated/graphql-types";

/** 登录 mutation / me query 返回的用户信息 — 关联对象可能只含 id+name */
type UserInfo = Partial<
  Omit<User, 'department' | 'position' | 'createdAt' | 'updatedAt'>
> & {
  department?: Pick<Department, 'id' | 'name'> | null;
  position?: Pick<Position, 'id' | 'name'> | null;
  createdAt?: unknown;
  updatedAt?: unknown;
};

interface AuthState {
  user?: UserInfo | null;
  setUser: (user?: UserInfo) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
