import { Separator } from '@/components/ui/separator';

import type { ContentBlocks } from '../../../../../../schemas/content/content-blocks.schema';
import type { BlockSupports } from '../../../../../../blocks/block.schema';

import EditorSettingsSidebarContentBlockTabSupportsWidth from './width';
import EditorSettingsSidebarContentBlockTabSupportsAlign from './align';

export default function EditorSettingsSidebarContentBlockTabSupports({
  block,
  blockSupports,
}: {
  block: ContentBlocks;
  blockSupports: BlockSupports;
}) {
  return (
    <>
      <Separator />
      <span className="text-sm font-medium">Supports</span>
      {blockSupports.width && (
        <EditorSettingsSidebarContentBlockTabSupportsWidth block={block} blockSupports={blockSupports} />
      )}
      {blockSupports.align && (
        <EditorSettingsSidebarContentBlockTabSupportsAlign block={block} blockSupports={blockSupports} />
      )}
    </>
  );
}
