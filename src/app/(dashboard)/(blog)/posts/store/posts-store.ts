import { create } from 'zustand';

type State = {
  deleteDialogOpen: boolean;
  deleteDialogPostId: string | null;
};

type Action = {
  setDeleteDialogOpen: (open: boolean) => void;
  setDeleteDialogPostId: (userId: string | null) => void;
};

export const usePostsStore = create<State & Action>((set) => ({
  deleteDialogOpen: false,
  setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),

  deleteDialogPostId: null,
  setDeleteDialogPostId: (userId) => set({ deleteDialogPostId: userId }),
}));
