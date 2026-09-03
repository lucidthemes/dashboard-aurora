import { useState, useEffect } from 'react';
import type { ChangeEventHandler } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../store/editor-store';

export default function useEditorSidebarSettingsSlug() {
  const { editorSlug, updateSettingsFieldContent, editorContentErrors } = useEditorStore(
    useShallow((state) => ({
      editorSlug: state.editorContent?.slug,
      updateSettingsFieldContent: state.updateSettingsFieldContent,
      editorContentErrors: state.editorContentErrors,
    })),
  );

  const [slug, setSlug] = useState(editorSlug);
  const [slugUpdated, setSlugUpdated] = useState(false);

  const handleChangeSlug: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;

    setSlug(value);
    setSlugUpdated(true);
  };

  useEffect(() => {
    setSlug(editorSlug);
  }, [editorSlug]);

  useEffect(() => {
    if (!slugUpdated) return;

    const debounceTimeout = setTimeout(() => {
      updateSettingsFieldContent({ field: 'slug', value: slug });

      setSlugUpdated(false);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [slug, slugUpdated, updateSettingsFieldContent]);

  const editorSlugErrors = editorContentErrors?.filter((error) => error.path === 'slug');

  return { slug, handleChangeSlug, editorSlugErrors };
}
