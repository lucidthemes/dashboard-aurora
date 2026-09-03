import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorSidebarSettingsImageAdd } from '../../../../../../hooks/sidebars/use-image';

export default function EditorSettingsSidebarContentImageAdd() {
  const addSettingsImageContent = useEditorSidebarSettingsImageAdd();

  return (
    <Button variant="outline" className="w-full cursor-pointer" onClick={addSettingsImageContent}>
      <Plus />
    </Button>
  );
}
