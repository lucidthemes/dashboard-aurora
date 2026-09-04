import { useState, useEffect } from 'react';
import type { ChangeEventHandler } from 'react';
import { useShallow } from 'zustand/react/shallow';

import type { Post } from '@/schemas/post/post.schema';

import { useEditorStore } from '../../store/editor-store';

export default function useEditorSidebarSettingsExcerpt() {
  const { editorContent, updateSettingsFieldContent } = useEditorStore(
    useShallow((state) => ({
      editorContent: state.editorContent,
      updateSettingsFieldContent: state.updateSettingsFieldContent,
    })),
  );

  const editorExcerpt = (editorContent as Post).excerpt;

  const [excerptOpen, setExcerptOpen] = useState(false);

  const [excerpt, setExcerpt] = useState(editorExcerpt);
  const [excerptUpdated, setExcerptUpdated] = useState(false);

  const handleExcerptOpen = () => {
    setExcerptOpen((prevState) => !prevState);
  };

  const handleChangeExcerpt: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.target.value;

    setExcerpt(value);
    setExcerptUpdated(true);
  };

  useEffect(() => {
    setExcerpt(editorExcerpt);
  }, [editorExcerpt]);

  useEffect(() => {
    if (!excerptUpdated) return;

    const debounceTimeout = setTimeout(() => {
      updateSettingsFieldContent({ field: 'excerpt', value: excerpt });

      setExcerptUpdated(false);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [excerpt, excerptUpdated, updateSettingsFieldContent]);

  return { excerptOpen, handleExcerptOpen, excerpt, handleChangeExcerpt };
}
