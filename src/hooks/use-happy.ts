import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  happy: boolean;
};

type Actions = {
  setHappy: (happy: boolean) => void;
};

export const useHappy = create<State & Actions>()(
  immer((set) => ({
    happy: false,
    setHappy: (happy) =>
      set((state) => {
        state.happy = happy;
      }),
  })),
);
