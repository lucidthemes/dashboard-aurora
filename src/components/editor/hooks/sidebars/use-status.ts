import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../store/editor-store';

export default function useEditorSidebarSettingsStatus() {
  const { editorStatus, updateSettingsFieldContent } = useEditorStore(
    useShallow((state) => ({
      editorStatus: state.editorContent?.status,
      updateSettingsFieldContent: state.updateSettingsFieldContent,
    })),
  );

  const handleChangeStatus = (status: 'draft' | 'published') => {
    updateSettingsFieldContent({ field: 'status', value: status });
  };

  return { editorStatus, handleChangeStatus };
}
