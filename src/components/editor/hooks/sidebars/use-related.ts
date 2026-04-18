import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../store/editor-store';
import getEditorSidebarSettingsRelated from '../../data/sidebars/get-related';

export function useEditorSidebarSettingsRelated() {
  const [relatedOpen, setRelatedOpen] = useState(false);

  const handleRelatedOpen = () => {
    setRelatedOpen((prevState) => !prevState);
  };

  const { editorPostId, editorRelated } = useEditorStore(
    useShallow((state) => ({
      editorPostId: state.editorContent?.id,
      editorRelated: state.editorContent?.related,
    })),
  );

  return { relatedOpen, handleRelatedOpen, editorPostId, editorRelated };
}

export function useEditorSidebarSettingsRelatedItems(editorPostId?: string | null) {
  const relatedItemsQuery = useQuery({
    queryKey: ['editorSidebarSettingsRelated'],
    queryFn: () => getEditorSidebarSettingsRelated(editorPostId),
  });

  const updateSettingsFieldContent = useEditorStore((state) => state.updateSettingsFieldContent);

  const handleAddRelated = (relatedId: string) => {
    updateSettingsFieldContent({ field: 'related', value: relatedId, option: 'add' });
  };

  const handleRemoveRelated = (relatedId: string) => {
    updateSettingsFieldContent({ field: 'related', value: relatedId, option: 'remove' });
  };

  return { relatedItemsQuery, handleAddRelated, handleRemoveRelated };
}
