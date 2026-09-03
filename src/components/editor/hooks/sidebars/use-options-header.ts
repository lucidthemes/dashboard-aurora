import { useShallow } from 'zustand/react/shallow';

import type { Post } from '@/schemas/post/post.schema';

import { useEditorStore } from '../../store/editor-store';

export default function useEditorSidebarSettingsOptionsHeader() {
  const { editorContent, updateSettingsOptionsContent } = useEditorStore(
    useShallow((state) => ({
      editorContent: state.editorContent,
      updateSettingsOptionsContent: state.updateSettingsOptionsContent,
    })),
  );

  const editorHeaderOptions = (editorContent as Post).options?.header;

  const handleChangeHeaderShow = (headerShow: boolean) => {
    updateSettingsOptionsContent({ section: 'header', field: 'show', value: headerShow });
  };

  const handleChangeHeaderLayout = (
    headerLayout:
      | 'outside-above'
      | 'outside-below'
      | 'split-narrow'
      | 'split-wide'
      | 'split-full'
      | 'overlay-narrow'
      | 'overlay-wide'
      | 'overlay-full',
  ) => {
    updateSettingsOptionsContent({ section: 'header', field: 'layout', value: headerLayout });
  };

  const handleChangeHeaderBesideSidebar = (headerBesideSidebar: boolean) => {
    updateSettingsOptionsContent({ section: 'header', field: 'besideSidebar', value: headerBesideSidebar });
  };

  return { editorHeaderOptions, handleChangeHeaderShow, handleChangeHeaderLayout, handleChangeHeaderBesideSidebar };
}
