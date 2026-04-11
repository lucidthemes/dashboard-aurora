import { create } from 'zustand';

import type { PostsTagsList } from '../schemas/tags-list.schema';

type State = {
  createSheetOpen: boolean;

  editSheetOpen: boolean;
  editSheetPostTag: PostsTagsList | null;

  deleteDialogOpen: boolean;
  deleteDialogPostTagId: string | null;
};

type Action = {
  setCreateSheetOpen: (open: boolean) => void;

  setEditSheetOpen: (open: boolean) => void;
  setEditSheetPostTag: (tag: PostsTagsList | null) => void;

  setDeleteDialogOpen: (open: boolean) => void;
  setDeleteDialogPostTagId: (tagId: string | null) => void;
};

export const usePostsTagsStore = create<State & Action>((set) => ({
  createSheetOpen: false,
  setCreateSheetOpen: (open) => set({ createSheetOpen: open }),

  editSheetOpen: false,
  setEditSheetOpen: (open) => set({ editSheetOpen: open }),

  editSheetPostTag: null,
  setEditSheetPostTag: (tag) => set({ editSheetPostTag: tag }),

  deleteDialogOpen: false,
  setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),

  deleteDialogPostTagId: null,
  setDeleteDialogPostTagId: (tagId) => set({ deleteDialogPostTagId: tagId }),
}));
