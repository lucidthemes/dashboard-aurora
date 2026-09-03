import { useEffect, useRef } from 'react';
import type { KeyboardEventHandler } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../store/editor-store';

import type { ImageContentBlock } from './schema';

export default function useImageBlock({ id, attributes }: Omit<ImageContentBlock, 'type'>) {
  const {
    setMediaDialogOpen,
    setMediaDialogType,
    setMediaDialogContext,
    setMediaDialogCount,
    setMediaDialogBlockId,
    removeImageBlockImage,
  } = useEditorStore(
    useShallow((state) => ({
      setMediaDialogOpen: state.setMediaDialogOpen,
      setMediaDialogType: state.setMediaDialogType,
      setMediaDialogContext: state.setMediaDialogContext,
      setMediaDialogCount: state.setMediaDialogCount,
      setMediaDialogBlockId: state.setMediaDialogBlockId,
      removeImageBlockImage: state.removeImageBlockImage,
    })),
  );

  const editImageBlockURL = () => {
    setMediaDialogOpen(true);
    setMediaDialogType('image');
    setMediaDialogContext('block');
    setMediaDialogCount('single');
    setMediaDialogBlockId(id);
  };

  const removeImageBlockURL = () => {
    removeImageBlockImage({ blockId: id });
  };

  const imageCaptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!imageCaptionRef.current) return;

    if (imageCaptionRef.current.textContent !== attributes?.caption?.value) {
      imageCaptionRef.current.textContent = attributes?.caption?.value ?? '';
    }
  }, [attributes?.caption]);

  const handleImageCaptionOnEnter: KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key.toLocaleLowerCase() === 'enter') {
      e.preventDefault();
    }
  };

  return {
    editImageBlockURL,
    removeImageBlockURL,
    imageCaptionRef,
    handleImageCaptionOnEnter,
  };
}
