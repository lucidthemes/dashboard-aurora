'use client';

import { useShallow } from 'zustand/react/shallow';

import { Separator } from '@/components/ui/separator';

import { useEditorStore } from '../../../store/editor-store';
import { blockRegistry } from '../../../blocks/blocks';

import EditorToolbarMove from './move';
import EditorToolbarBlockSupports from './block-supports/block-supports';
import EditorToolbarBlockOptions from './block-options';
import EditorToolbarOptions from './options';

export default function EditorToolbarContent() {
  const { contentBlocks, selectedContentBlock } = useEditorStore(
    useShallow((state) => ({
      contentBlocks: state.editorContent?.content,
      selectedContentBlock: state.selectedContentBlock,
    })),
  );

  const block = contentBlocks?.find((contentBlock) => contentBlock.id === selectedContentBlock);

  if (!selectedContentBlock || !block) return;

  const blockType = block.type;

  const blockMeta = blockRegistry[blockType].meta;

  const blockSupports = blockMeta.supports;

  const blockOptions = blockMeta.options;

  return (
    <div className="flex gap-x-3 rounded-md border bg-background px-3 py-2">
      <span
        className="h-5 w-5 self-center fill-foreground [&>svg]:size-5"
        dangerouslySetInnerHTML={{ __html: blockMeta.icon }}
        title={blockMeta.title}
      />
      <EditorToolbarMove block={block} />
      {blockSupports && <EditorToolbarBlockSupports block={block} blockSupports={blockSupports} />}
      {blockOptions && <EditorToolbarBlockOptions block={block} blockOptions={blockOptions} />}
      <Separator orientation="vertical" className="h-auto! w-2 bg-border" />
      <EditorToolbarOptions blockId={block.id} />
    </div>
  );
}
