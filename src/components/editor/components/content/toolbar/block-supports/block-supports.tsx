import { Separator } from '@/components/ui/separator';

import type { ContentBlocks } from '../../../../schemas/content/content-blocks.schema';
import type { BlockSupports } from '../../../../blocks/block.schema';

import EditorToolbarBlockSupportsWidth from './width';
import EditorToolbarBlockSupportsAlign from './align';
import EditorToolbarBlockSupportsRichText from './rich-text';

export default function EditorToolbarBlockSupports({
  block,
  blockSupports,
}: {
  block: ContentBlocks;
  blockSupports: BlockSupports;
}) {
  if (!blockSupports) return;

  return (
    <>
      <Separator orientation="vertical" className="h-auto! w-2 bg-border" />
      {blockSupports.width && <EditorToolbarBlockSupportsWidth block={block} blockSupports={blockSupports} />}
      {blockSupports.align && <EditorToolbarBlockSupportsAlign block={block} blockSupports={blockSupports} />}
      {blockSupports.richText && <EditorToolbarBlockSupportsRichText block={block} blockSupports={blockSupports} />}
    </>
  );
}
