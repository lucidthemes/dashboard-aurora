import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { Post } from '@/schemas/post/post.schema';

import { useEditorStore } from '../../store/editor-store';
import getEditorSidebarSettingsCategories from '../../data/sidebars/get-categories';

export function useEditorSidebarSettingsCategories() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const handleCategoriesOpen = () => {
    setCategoriesOpen((prevState) => !prevState);
  };

  const postEditorContent = useEditorStore((state) => state.editorContent) as Post;

  const editorCategories = postEditorContent.categories;

  return { categoriesOpen, handleCategoriesOpen, editorCategories };
}

export function useEditorSidebarSettingsCategoriesItems() {
  const categoriesItemsQuery = useQuery({
    queryKey: ['editorSidebarSettingsCategories'],
    queryFn: () => getEditorSidebarSettingsCategories(),
  });

  const updateSettingsFieldContent = useEditorStore((state) => state.updateSettingsFieldContent);

  const handleAddCategory = (categoryId: string) => {
    updateSettingsFieldContent({ field: 'categories', value: categoryId, option: 'add' });
  };

  const handleRemoveCategory = (categoryId: string) => {
    updateSettingsFieldContent({ field: 'categories', value: categoryId, option: 'remove' });
  };

  return { categoriesItemsQuery, handleAddCategory, handleRemoveCategory };
}
