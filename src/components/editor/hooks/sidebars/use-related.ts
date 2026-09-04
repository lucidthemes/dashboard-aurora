import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { Post } from '@/schemas/post/post.schema';

import { useEditorStore } from '../../store/editor-store';
import getEditorSidebarSettingsRelated from '../../data/sidebars/get-related';

export function useEditorSidebarSettingsRelated() {
  const [relatedOpen, setRelatedOpen] = useState(false);

  const handleRelatedOpen = () => {
    setRelatedOpen((prevState) => !prevState);
  };

  const postEditorContent = useEditorStore((state) => state.editorContent) as Post;

  const editorPostId = postEditorContent.id;
  const editorRelated = postEditorContent.related;

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
