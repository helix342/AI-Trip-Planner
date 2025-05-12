import { create } from 'zustand';

interface TripState {
  fromCity: string;
  toCity: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number[];
  duration: number;
  travelType: string;
  setTripDetails: (details: Partial<TripState>) => void;
  clearTripDetails: () => void;
}

export const useTripStore = create<TripState>((set) => ({
  fromCity: '',
  toCity: '',
  startDate: '',
  endDate: '',
  travelers: 1,
  budget: [5000, 50000],
  duration: 3,
  travelType: '',
  setTripDetails: (details) => set((state) => ({ ...state, ...details })),
  clearTripDetails: () => set({
    fromCity: '',
    toCity: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: [5000, 50000],
    duration: 3,
    travelType: ''
  }),
}));