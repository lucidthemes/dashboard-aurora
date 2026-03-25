import { create } from 'zustand';

import type { UsersList } from '../schemas/users-list.schema';

type State = {
  createSheetOpen: boolean;

  viewSheetOpen: boolean;
  viewSheetUser: UsersList | null;

  editSheetOpen: boolean;
  editSheetUser: UsersList | null;

  deleteDialogOpen: boolean;
  deleteDialogUserId: string | null;
};

type Action = {
  setCreateSheetOpen: (open: boolean) => void;

  setViewSheetOpen: (open: boolean) => void;
  setViewSheetUser: (user: UsersList | null) => void;

  setEditSheetOpen: (open: boolean) => void;
  setEditSheetUser: (user: UsersList | null) => void;

  setDeleteDialogOpen: (open: boolean) => void;
  setDeleteDialogUserId: (userId: string | null) => void;
};

export const useUsersStore = create<State & Action>((set) => ({
  createSheetOpen: false,
  setCreateSheetOpen: (open) => set({ createSheetOpen: open }),

  viewSheetOpen: false,
  setViewSheetOpen: (open) => set({ viewSheetOpen: open }),

  viewSheetUser: null,
  setViewSheetUser: (user) => set({ viewSheetUser: user }),

  editSheetOpen: false,
  setEditSheetOpen: (open) => set({ editSheetOpen: open }),

  editSheetUser: null,
  setEditSheetUser: (user) => set({ editSheetUser: user }),

  deleteDialogOpen: false,
  setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),

  deleteDialogUserId: null,
  setDeleteDialogUserId: (userId) => set({ deleteDialogUserId: userId }),
}));
