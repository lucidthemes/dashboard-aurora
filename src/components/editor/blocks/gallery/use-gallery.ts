import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../store/editor-store';

import type { GalleryContentBlock } from './schema';

export default function useGalleryBlock({ id }: Omit<GalleryContentBlock, 'type'>) {
  const { setMediaDialogOpen, setMediaDialogContext, setMediaDialogType, setMediaDialogCount, setMediaDialogBlockId } =
    useEditorStore(
      useShallow((state) => ({
        setMediaDialogOpen: state.setMediaDialogOpen,
        setMediaDialogContext: state.setMediaDialogContext,
        setMediaDialogType: state.setMediaDialogType,
        setMediaDialogCount: state.setMediaDialogCount,
        setMediaDialogBlockId: state.setMediaDialogBlockId,
      })),
    );

  const editGalleryBlockImages = () => {
    setMediaDialogOpen(true);
    setMediaDialogContext('block');
    setMediaDialogType('image');
    setMediaDialogCount('multiple');
    setMediaDialogBlockId(id);
  };

  return { editGalleryBlockImages };
}
