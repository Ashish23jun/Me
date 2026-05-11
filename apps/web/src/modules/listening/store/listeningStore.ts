import { create } from 'zustand';

interface ListeningState {
  useMockData: boolean;
  setUseMockData: (v: boolean) => void;
}

export const useListeningStore = create<ListeningState>((set) => ({
  useMockData: false,
  setUseMockData: (v) => set({ useMockData: v }),
}));
