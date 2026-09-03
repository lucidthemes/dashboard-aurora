import { TabsContent } from '@/components/ui/tabs';

import { useEditorStore } from '../../../../../store/editor-store';
import { blockRegistry } from '../../../../../blocks/blocks';

import EditorSettingsSidebarContentBlockTabMeta from './meta';
import EditorSettingsSidebarContentBlockTabContent from './content';

export default function EditorSettingsSidebarContentBlockTab({
  selectedContentBlock,
}: {
  selectedContentBlock: string | null;
}) {
  const contentBlocks = useEditorStore((state) => state.editorContent?.content);

  const selectedBlock = contentBlocks?.find((block) => block.id === selectedContentBlock);

  const selectedBlockType = selectedBlock?.type;

  const blockMeta = selectedBlockType && blockRegistry[selectedBlockType].meta;

  return (
    <TabsContent value="block" className="h-full" data-editor-sidebar-settings-block-tab>
      <div className="flex-1 overflow-y-auto p-5">
        {selectedContentBlock && blockMeta ? (
          <div className="flex flex-col gap-y-5">
            <EditorSettingsSidebarContentBlockTabMeta blockMeta={blockMeta} />
            <EditorSettingsSidebarContentBlockTabContent block={selectedBlock} blockMeta={blockMeta} />
          </div>
        ) : (
          <p className="rounded-md bg-secondary p-5 text-center text-sm font-normal">No block selected</p>
        )}
      </div>
    </TabsContent>
  );
}
