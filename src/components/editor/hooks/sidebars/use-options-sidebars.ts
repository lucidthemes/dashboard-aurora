import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../store/editor-store';
import getEditorSidebarSettingsOptionsSidebars from '../../data/sidebars/get-options-sidebars';

export function useEditorSidebarSettingsOptionsSidebars() {
  const { editorSidebarOptions, updateSettingsOptionsContent } = useEditorStore(
    useShallow((state) => ({
      editorSidebarOptions: state.editorContent?.options?.sidebar,
      updateSettingsOptionsContent: state.updateSettingsOptionsContent,
    })),
  );

  const handleChangeSidebarShow = (sidebarShow: boolean) => {
    updateSettingsOptionsContent({ section: 'sidebar', field: 'show', value: sidebarShow });
  };

  const handleChangeSidebarPosition = (sidebarPosition: 'left' | 'right') => {
    updateSettingsOptionsContent({ section: 'sidebar', field: 'show', value: sidebarPosition });
  };

  return { editorSidebarOptions, handleChangeSidebarShow, handleChangeSidebarPosition };
}

export function useEditorSidebarSettingsOptionsSidebarsItems() {
  const sidebarsItemsQuery = useQuery({
    queryKey: ['editorSidebarSettingsOptionsSidebars'],
    queryFn: () => getEditorSidebarSettingsOptionsSidebars(),
  });

  const updateSettingsOptionsContent = useEditorStore((state) => state.updateSettingsOptionsContent);

  const handleChangeSidebarOption = (sidebarId: string) => {
    updateSettingsOptionsContent({ section: 'sidebar', field: 'option', value: sidebarId });
  };

  return { sidebarsItemsQuery, handleChangeSidebarOption };
}
