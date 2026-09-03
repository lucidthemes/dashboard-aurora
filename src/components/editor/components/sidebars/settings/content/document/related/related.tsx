import { ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorSidebarSettingsRelated } from '../../../../../../hooks/sidebars/use-related';
import EditorSettingsSidebarContentRelatedItems from './items';

export default function EditorSettingsSidebarContentRelated() {
  const { relatedOpen, handleRelatedOpen, editorPostId, editorRelated } = useEditorSidebarSettingsRelated();

  return (
    <div className="flex flex-col gap-y-2.5">
      <Button
        variant="ghost"
        size="lg"
        className="flex cursor-pointer justify-between px-0! hover:bg-background"
        onClick={handleRelatedOpen}
      >
        Related {relatedOpen ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {relatedOpen && (
        <div className="mb-2.5">
          <EditorSettingsSidebarContentRelatedItems editorPostId={editorPostId} editorRelated={editorRelated} />
        </div>
      )}
    </div>
  );
}
