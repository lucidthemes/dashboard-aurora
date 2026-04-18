import { ChevronUp, ChevronDown } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/ui/button';

import { useEditorStore } from '../../../store/editor-store';
import type { ContentBlocks } from '../../../schemas/content/content-blocks.schema';

export default function EditorToolbarMove({ block }: { block: ContentBlocks }) {
  const { contentBlocks, moveContentBlock } = useEditorStore(
    useShallow((state) => ({
      contentBlocks: state.editorContent?.content,
      moveContentBlock: state.moveContentBlock,
    })),
  );

  const blockPosition = contentBlocks?.findIndex((contentBlock) => contentBlock.id === block.id) ?? 0;

  const maxBlockPosition = contentBlocks?.length ? contentBlocks.length - 1 : contentBlocks?.length;

  return (
    <div className="flex flex-col pl-0.5">
      <Button
        size="icon-sm"
        variant="ghost"
        className="max-h-4 max-w-4 cursor-pointer"
        title="Move up"
        onClick={() => moveContentBlock({ blockId: block.id, currentPosition: blockPosition, direction: 'up' })}
        disabled={blockPosition === 0 ? true : false}
      >
        <ChevronUp />
      </Button>
      <Button
        size="icon-sm"
        variant="ghost"
        className="max-h-4 max-w-4 cursor-pointer"
        title="Move down"
        onClick={() => moveContentBlock({ blockId: block.id, currentPosition: blockPosition, direction: 'down' })}
        disabled={blockPosition === maxBlockPosition ? true : false}
      >
        <ChevronDown />
      </Button>
    </div>
  );
}
