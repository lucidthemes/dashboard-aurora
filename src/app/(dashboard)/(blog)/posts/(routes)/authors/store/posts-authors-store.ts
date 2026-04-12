import { create } from 'zustand';

import type { PostsAuthorsList } from '../schemas/authors-list.schema';

type State = {
  createSheetOpen: boolean;

  editSheetOpen: boolean;
  editSheetPostAuthor: PostsAuthorsList | null;

  deleteDialogOpen: boolean;
  deleteDialogPostAuthorId: string | null;
};

type Action = {
  setCreateSheetOpen: (open: boolean) => void;

  setEditSheetOpen: (open: boolean) => void;
  setEditSheetPostAuthor: (author: PostsAuthorsList | null) => void;

  setDeleteDialogOpen: (open: boolean) => void;
  setDeleteDialogPostAuthorId: (authorId: string | null) => void;
};

export const usePostsAuthorsStore = create<State & Action>((set) => ({
  createSheetOpen: false,
  setCreateSheetOpen: (open) => set({ createSheetOpen: open }),

  editSheetOpen: false,
  setEditSheetOpen: (open) => set({ editSheetOpen: open }),

  editSheetPostAuthor: null,
  setEditSheetPostAuthor: (author) => set({ editSheetPostAuthor: author }),

  deleteDialogOpen: false,
  setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),

  deleteDialogPostAuthorId: null,
  setDeleteDialogPostAuthorId: (authorId) => set({ deleteDialogPostAuthorId: authorId }),
}));
