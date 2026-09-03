import { Separator } from '@/components/ui/separator';

import type { ContentBlocks } from '../../../../../../schemas/content/content-blocks.schema';
import type { BlockSupports } from '../../../../../../blocks/block.schema';

import EditorSettingsSidebarContentBlockTabAdvancedAnchor from './anchor';
import EditorSettingsSidebarContentBlockTabAdvancedCustomClasses from './custom-classes';

export default function EditorSettingsSidebarContentBlockTabAdvanced({
  block,
  blockSupports,
}: {
  block: ContentBlocks;
  blockSupports: BlockSupports;
}) {
  if (!blockSupports.anchor || !blockSupports.customClasses) return;

  return (
    <>
      <Separator />
      <span className="text-sm font-medium">Advanced</span>
      {blockSupports.anchor && (
        <EditorSettingsSidebarContentBlockTabAdvancedAnchor block={block} blockSupports={blockSupports} />
      )}
      {blockSupports.customClasses && (
        <EditorSettingsSidebarContentBlockTabAdvancedCustomClasses block={block} blockSupports={blockSupports} />
      )}
    </>
  );
}
