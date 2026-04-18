import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../store/editor-store';

import type { VideoContentBlock } from './schema';

export default function useVideoBlock({ id }: Omit<VideoContentBlock, 'type'>) {
  const {
    setMediaDialogOpen,
    setMediaDialogType,
    setMediaDialogContext,
    setMediaDialogCount,
    setMediaDialogBlockId,
    removeVideoBlockVideo,
  } = useEditorStore(
    useShallow((state) => ({
      setMediaDialogOpen: state.setMediaDialogOpen,
      setMediaDialogType: state.setMediaDialogType,
      setMediaDialogContext: state.setMediaDialogContext,
      setMediaDialogCount: state.setMediaDialogCount,
      setMediaDialogBlockId: state.setMediaDialogBlockId,
      removeVideoBlockVideo: state.removeVideoBlockVideo,
    })),
  );

  const editVideoBlockURL = () => {
    setMediaDialogOpen(true);
    setMediaDialogType('video');
    setMediaDialogContext('block');
    setMediaDialogCount('single');
    setMediaDialogBlockId(id);
  };

  const removeVideoBlockURL = () => {
    removeVideoBlockVideo({ blockId: id });
  };

  return { editVideoBlockURL, removeVideoBlockURL };
}
