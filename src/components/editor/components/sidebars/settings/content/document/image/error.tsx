import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorStore } from '../../../../../../store/editor-store';

export default function EditorSettingsSidebarContentImageError() {
  const removeSettingsImageContent = useEditorStore((state) => state.removeSettingsImageContent);

  return (
    <div className="relative flex aspect-video w-full items-center justify-center rounded-sm bg-sidebar">
      <span className="text-sm">Error loading image</span>
      <Button
        variant="outline"
        size="sm"
        className="absolute top-2.5 right-2.5 max-w-fit cursor-pointer"
        onClick={removeSettingsImageContent}
      >
        <Trash />
      </Button>
    </div>
  );
}
