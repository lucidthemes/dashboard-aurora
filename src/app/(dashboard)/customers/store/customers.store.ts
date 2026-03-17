import { create } from 'zustand';

import type { CustomersList } from '../schemas/customers-list.schema';

type State = {
  viewSheetOpen: boolean;
  viewSheetCustomer: CustomersList | null;
};

type Action = {
  setViewSheetOpen: (open: boolean) => void;
  setViewSheetCustomer: (customer: CustomersList | null) => void;
};

export const useCustomersStore = create<State & Action>((set) => ({
  viewSheetOpen: false,
  setViewSheetOpen: (open) => set({ viewSheetOpen: open }),

  viewSheetCustomer: null,
  setViewSheetCustomer: (customer) => set({ viewSheetCustomer: customer }),
}));
