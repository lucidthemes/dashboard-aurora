import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

import type { Post } from '@/schemas/post/post.schema';

import { useEditorStore } from '../../store/editor-store';
import getEditorSidebarSettingsAuthors from '../../data/sidebars/get-authors';

export function useEditorSidebarSettingsAuthors() {
  const { editorContent, editorContentErrors } = useEditorStore(
    useShallow((state) => ({
      editorContent: state.editorContent,
      editorContentErrors: state.editorContentErrors,
    })),
  );

  const editorAuthorId = (editorContent as Post).author_id;

  const editorAuthorErrors = editorContentErrors?.filter((error) => error.path === 'author_id');

  return { editorAuthorId, editorAuthorErrors };
}

export function useEditorSidebarSettingsAuthorsItems() {
  const authorsItemsQuery = useQuery({
    queryKey: ['editorSidebarSettingsAuthors'],
    queryFn: () => getEditorSidebarSettingsAuthors(),
  });

  const updateSettingsFieldContent = useEditorStore((state) => state.updateSettingsFieldContent);

  const handleChangeAuthor = (authorId: string) => {
    updateSettingsFieldContent({ field: 'author_id', value: authorId });
  };

  return { authorsItemsQuery, handleChangeAuthor };
}
