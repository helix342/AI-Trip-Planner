import { create } from 'zustand';

interface BookingItem {
  type: string;
  name: string;
  price: number;
}

interface BookingState {
  items: BookingItem[];
  totalAmount: number;
  addItem: (item: BookingItem) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  items: [],
  totalAmount: 0,
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
      totalAmount: state.totalAmount + item.price,
    })),
  removeItem: (index) =>
    set((state) => ({
      items: state.items.filter((_, i) => i !== index),
      totalAmount: state.totalAmount - state.items[index].price,
    })),
  clearItems: () => set({ items: [], totalAmount: 0 }),
}));