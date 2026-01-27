import { create } from 'zustand';

type Layout = 'grid' | 'list';
type Upload = 'image' | 'video' | null;

export interface MediaEditData {
  id: string;
  alt_text?: string;
}

interface MediaStore {
  layout: Layout;
  setLayout: (layout: Layout) => void;

  viewOpen: boolean;
  setViewOpen: (open: boolean) => void;
  viewMediaType: Upload;
  setViewMediaType: (mediaType: Upload) => void;
  viewMediaUrl: string | undefined;
  setViewMediaUrl: (mediaUrl: string | undefined) => void;

  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  editData: MediaEditData | null;
  setEditData: (editData: MediaEditData | null) => void;

  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  deleteRowId: string | null;
  setDeleteRowId: (deleteRowId: string | null) => void;
  deleteTable: 'media' | null;
  setDeleteTable: (deleteTable: 'media' | null) => void;

  uploadOpen: boolean;
  setUploadOpen: (open: boolean) => void;
  uploadType: Upload;
  setUploadType: (type: Upload) => void;
}

export const useMediaStore = create<MediaStore>((set) => ({
  layout: 'grid',
  setLayout: (layout) => set({ layout }),

  viewOpen: false,
  setViewOpen: (open) => set({ viewOpen: open }),
  viewMediaType: null,
  setViewMediaType: (mediaType) => set({ viewMediaType: mediaType }),
  viewMediaUrl: undefined,
  setViewMediaUrl: (mediaUrl) => set({ viewMediaUrl: mediaUrl }),

  editOpen: false,
  setEditOpen: (open) => set({ editOpen: open }),
  editData: null,
  setEditData: (editData) => set({ editData: editData }),

  deleteOpen: false,
  setDeleteOpen: (open) => set({ deleteOpen: open }),
  deleteRowId: null,
  setDeleteRowId: (deleteRowId) => set({ deleteRowId: deleteRowId }),
  deleteTable: null,
  setDeleteTable: (deleteTable) => set({ deleteTable: deleteTable }),

  uploadOpen: false,
  setUploadOpen: (open) => set({ uploadOpen: open }),
  uploadType: null,
  setUploadType: (type) => set({ uploadType: type }),
}));
