// cartStore.ts
import { create } from 'zustand';

export const useUserStore = create(set => ({
  userAuth: null,
  userData: null,
  setUserAuth: user => set({ userAuth: user }),
  setUserData: user => set({ userData: user }),
}));
