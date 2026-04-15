import { create } from 'zustand';

type State = {
  deleteDialogOpen: boolean;
  deleteDialogPageId: string | null;
};

type Action = {
  setDeleteDialogOpen: (open: boolean) => void;
  setDeleteDialogPageId: (pageId: string | null) => void;
};

export const usePagesStore = create<State & Action>((set) => ({
  deleteDialogOpen: false,
  setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),

  deleteDialogPageId: null,
  setDeleteDialogPageId: (pageId) => set({ deleteDialogPageId: pageId }),
}));
