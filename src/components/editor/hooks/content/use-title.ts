import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../store/editor-store';

export default function useEditorContentTitle() {
  const { editorContentTitle, editorContentErrors, updateEditorContentTitle } = useEditorStore(
    useShallow((state) => ({
      editorContentTitle: state.editorContent?.title,
      editorContentErrors: state.editorContentErrors,
      updateEditorContentTitle: state.updateEditorContentTitle,
    })),
  );

  const contentTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!contentTitleRef.current) return;

    if (contentTitleRef.current.innerHTML !== editorContentTitle) {
      contentTitleRef.current.innerHTML = editorContentTitle ?? '';
    }
  }, [editorContentTitle]);

  const handleContentTitleInput = () => {
    if (!contentTitleRef.current) return;

    const title = contentTitleRef.current.textContent?.trim() ?? '';

    if (title === '') {
      contentTitleRef.current.innerHTML = '';
    }
  };

  const handleContentTitleUpdate = () => {
    if (!contentTitleRef.current) return;

    const title = contentTitleRef.current.textContent.trim() ?? '';

    if (title !== editorContentTitle) {
      updateEditorContentTitle(title);
    }
  };

  const contentTitleErrors = editorContentErrors?.filter((error) => error.path === 'title');

  return { contentTitleRef, contentTitleErrors, handleContentTitleInput, handleContentTitleUpdate };
}
