import { create } from "zustand";

export const useStore = create<{ openNav: boolean }>((set) => ({
  openNav: false,
}));
