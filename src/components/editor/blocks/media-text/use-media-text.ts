import { useEffect, useRef } from 'react';
import type { KeyboardEventHandler } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../store/editor-store';

import type { MediaTextContentBlock } from './schema';

export default function useMediaTextBlock({ id, attributes }: Omit<MediaTextContentBlock, 'type'>) {
  const {
    setMediaDialogOpen,
    setMediaDialogType,
    setMediaDialogContext,
    setMediaDialogCount,
    setMediaDialogBlockId,
    removeMediaTextBlockMedia,
  } = useEditorStore(
    useShallow((state) => ({
      setMediaDialogOpen: state.setMediaDialogOpen,
      setMediaDialogType: state.setMediaDialogType,
      setMediaDialogContext: state.setMediaDialogContext,
      setMediaDialogCount: state.setMediaDialogCount,
      setMediaDialogBlockId: state.setMediaDialogBlockId,
      removeMediaTextBlockMedia: state.removeMediaTextBlockMedia,
    })),
  );

  const editMediaTextBlockURL = (mediaType: 'image' | 'video') => {
    setMediaDialogOpen(true);
    setMediaDialogType(mediaType);
    setMediaDialogContext('block');
    setMediaDialogCount('single');
    setMediaDialogBlockId(id);
  };

  const removeMediaTextBlockURL = () => {
    removeMediaTextBlockMedia({ blockId: id });
  };

  const mediaTextContentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!mediaTextContentRef.current) return;

    if (mediaTextContentRef.current.innerHTML !== attributes?.text?.value) {
      mediaTextContentRef.current.innerHTML = attributes?.text?.value ?? '';
    }
  }, [attributes?.text]);

  const handleMediaTextContentOnEnter: KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key.toLocaleLowerCase() === 'enter') {
      e.preventDefault();
    }
  };

  return {
    editMediaTextBlockURL,
    removeMediaTextBlockURL,
    mediaTextContentRef,
    handleMediaTextContentOnEnter,
  };
}
