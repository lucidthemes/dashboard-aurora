import { ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorSidebarSettingsTags } from '../../../../../../hooks/sidebars/use-tags';
import EditorSettingsSidebarContentTagsItems from './items';

export default function EditorSettingsSidebarContentTags() {
  const { tagsOpen, handleTagsOpen, editorTags } = useEditorSidebarSettingsTags();

  return (
    <div className="flex flex-col gap-y-2.5">
      <Button
        variant="ghost"
        size="lg"
        className="flex cursor-pointer justify-between px-0! hover:bg-background"
        onClick={handleTagsOpen}
      >
        Tags {tagsOpen ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {tagsOpen && (
        <div className="mb-2.5">
          <EditorSettingsSidebarContentTagsItems editorTags={editorTags} />
        </div>
      )}
    </div>
  );
}
