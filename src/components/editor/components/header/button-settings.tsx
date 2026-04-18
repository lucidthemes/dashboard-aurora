import { PanelRight } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/ui/button';

import { useEditorStore } from '../../store/editor-store';

export default function EditorHeaderButtonSettings() {
  const { settingsSidebarOpen, setSettingsSidebarOpen } = useEditorStore(
    useShallow((state) => ({
      settingsSidebarOpen: state.settingsSidebarOpen,
      setSettingsSidebarOpen: state.setSettingsSidebarOpen,
    })),
  );

  return (
    <Button
      variant={!settingsSidebarOpen ? 'outline' : 'default'}
      size="icon"
      className="cursor-pointer"
      onClick={() => setSettingsSidebarOpen(!settingsSidebarOpen)}
      title="Settings"
    >
      <PanelRight />
    </Button>
  );
}
