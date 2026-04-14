import { create } from 'zustand';

import type { InstagramFeed, InstagramFeedMedia } from '../schemas/feed.schema';
import type { InstagramFeedFormImages } from '../schemas/form.schema';

type State = {
  createOpen: boolean;

  editOpen: boolean;
  editData: InstagramFeed | null;

  deleteOpen: boolean;
  deleteRowId: string | null;

  formMediaOpen: boolean;

  selectedImages: InstagramFeedFormImages[];
};

type Action = {
  setCreateOpen: (open: boolean) => void;

  setEditOpen: (open: boolean) => void;
  setEditData: (editData: InstagramFeed | null) => void;

  setDeleteOpen: (open: boolean) => void;
  setDeleteRowId: (deleteRowId: string | null) => void;

  setFormMediaOpen: (open: boolean) => void;

  setSelectedImages: (images: InstagramFeedFormImages[]) => void;
  addSelectedImage: (image: InstagramFeedMedia) => void;
  removeSelectedImage: (imageId: string) => void;
  updateSelectedImagePosition: (imageId: string, position: number) => void;
  resetSelectedImages: () => void;
};

export const useInstagramFeedStore = create<State & Action>((set) => ({
  createOpen: false,
  setCreateOpen: (open) => set({ createOpen: open }),

  editOpen: false,
  setEditOpen: (open) => set({ editOpen: open }),
  editData: null,
  setEditData: (editData) => set({ editData: editData }),

  deleteOpen: false,
  setDeleteOpen: (open) => set({ deleteOpen: open }),
  deleteRowId: null,
  setDeleteRowId: (deleteRowId) => set({ deleteRowId: deleteRowId }),

  formMediaOpen: false,
  setFormMediaOpen: (open) => set({ formMediaOpen: open }),

  selectedImages: [],
  setSelectedImages: (images) =>
    set((state) => {
      if (state.selectedImages.length > 0) return state;

      return { selectedImages: images };
    }),

  addSelectedImage: (image) =>
    set((state) => {
      // check if image clicked already exists within selected images
      if (state.selectedImages.some((existingSelected) => existingSelected.media.id === image.id)) return state;

      const newSelectedImage = {
        media: {
          id: image.id,
          storage_path: image.storage_path,
          alt_text: image.alt_text,
        },
        position: state.selectedImages.length + 1,
      };

      return { selectedImages: [...state.selectedImages, newSelectedImage] };
    }),

  removeSelectedImage: (imageId) =>
    set((state) => ({ selectedImages: state.selectedImages.filter((image) => image.media.id !== imageId) })),

  updateSelectedImagePosition: (imageId, position) =>
    set((state) => {
      if (!imageId || position < 1) return state;

      const updatedSelectedImages = state.selectedImages.map((image) => {
        if (image.media.id === imageId) {
          return { ...image, position };
        }

        return image;
      });

      return { selectedImages: updatedSelectedImages };
    }),

  resetSelectedImages: () => set(() => ({ selectedImages: [] })),
}));
