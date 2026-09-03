import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { Post } from '@/schemas/post/post.schema';

import { useEditorStore } from '../../store/editor-store';
import getEditorSidebarSettingsTags from '../../data/sidebars/get-tags';

export function useEditorSidebarSettingsTags() {
  const [tagsOpen, setTagsOpen] = useState(false);

  const handleTagsOpen = () => {
    setTagsOpen((prevState) => !prevState);
  };

  const postEditorContent = useEditorStore((state) => state.editorContent) as Post;

  const editorTags = postEditorContent.tags;

  return { tagsOpen, handleTagsOpen, editorTags };
}

export function useEditorSidebarSettingsTagsItems() {
  const tagsItemsQuery = useQuery({
    queryKey: ['editorSidebarSettingsTags'],
    queryFn: () => getEditorSidebarSettingsTags(),
  });

  const updateSettingsFieldContent = useEditorStore((state) => state.updateSettingsFieldContent);

  const handleAddTag = (tagId: string) => {
    updateSettingsFieldContent({ field: 'tags', value: tagId, option: 'add' });
  };

  const handleRemoveTag = (tagId: string) => {
    updateSettingsFieldContent({ field: 'tags', value: tagId, option: 'remove' });
  };

  return { tagsItemsQuery, handleAddTag, handleRemoveTag };
}
