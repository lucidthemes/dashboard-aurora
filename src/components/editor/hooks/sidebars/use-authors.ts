import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../store/editor-store';
import getEditorSidebarSettingsAuthors from '../../data/sidebars/get-authors';

export function useEditorSidebarSettingsAuthors() {
  const { editorAuthorId, editorContentErrors } = useEditorStore(
    useShallow((state) => ({
      editorAuthorId: state.editorContent?.author_id,
      editorContentErrors: state.editorContentErrors,
    })),
  );

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
