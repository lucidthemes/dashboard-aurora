import { create } from 'zustand';

import type { PostsCategoriesList } from '../schemas/categories-list.schema';

type State = {
  createSheetOpen: boolean;

  editSheetOpen: boolean;
  editSheetPostCategory: PostsCategoriesList | null;

  deleteDialogOpen: boolean;
  deleteDialogPostCategoryId: string | null;
};

type Action = {
  setCreateSheetOpen: (open: boolean) => void;

  setEditSheetOpen: (open: boolean) => void;
  setEditSheetPostCategory: (category: PostsCategoriesList | null) => void;

  setDeleteDialogOpen: (open: boolean) => void;
  setDeleteDialogPostCategoryId: (categoryId: string | null) => void;
};

export const usePostsCategoriesStore = create<State & Action>((set) => ({
  createSheetOpen: false,
  setCreateSheetOpen: (open) => set({ createSheetOpen: open }),

  editSheetOpen: false,
  setEditSheetOpen: (open) => set({ editSheetOpen: open }),

  editSheetPostCategory: null,
  setEditSheetPostCategory: (category) => set({ editSheetPostCategory: category }),

  deleteDialogOpen: false,
  setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),

  deleteDialogPostCategoryId: null,
  setDeleteDialogPostCategoryId: (categoryId) => set({ deleteDialogPostCategoryId: categoryId }),
}));
