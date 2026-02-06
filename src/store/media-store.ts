import { create } from 'zustand';

type Layout = 'grid' | 'list';
type Upload = 'image' | 'video' | null;

export interface MediaEditData {
  id: string;
  alt_text?: string;
}

type State = {
  layout: Layout;

  viewOpen: boolean;
  viewMediaType: Upload;
  viewMediaUrl: string | undefined;

  editOpen: boolean;
  editData: MediaEditData | null;

  deleteOpen: boolean;
  deleteRowId: string | null;
  deleteTable: 'media' | null;

  uploadOpen: boolean;
  uploadType: Upload;
};

type Action = {
  setLayout: (layout: Layout) => void;

  setViewOpen: (open: boolean) => void;
  setViewMediaType: (mediaType: Upload) => void;
  setViewMediaUrl: (mediaUrl: string | undefined) => void;

  setEditOpen: (open: boolean) => void;
  setEditData: (editData: MediaEditData | null) => void;

  setDeleteOpen: (open: boolean) => void;
  setDeleteRowId: (deleteRowId: string | null) => void;
  setDeleteTable: (deleteTable: 'media' | null) => void;

  setUploadOpen: (open: boolean) => void;
  setUploadType: (type: Upload) => void;
};

export const useMediaStore = create<State & Action>((set) => ({
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
