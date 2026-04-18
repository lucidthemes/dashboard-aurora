'use client';

import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

import { useEditorStore } from '../../../../../editor/store/editor-store';
import type { ContentBlocks } from '../../../../schemas/content/content-blocks.schema';
import EditorDocumentSidebarContentItem from './item';

export default function EditorDocumentSidebarContentItems({ contentBlocks }: { contentBlocks: ContentBlocks[] }) {
  const dragContentBlock = useEditorStore((state) => state.dragContentBlock);

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source } = event.operation;

        if (isSortable(source)) {
          const { initialIndex, index, id } = source;

          dragContentBlock({ blockId: id as string, currentPosition: initialIndex, newPosition: index });
        }
      }}
    >
      <ul className="flex flex-col">
        {contentBlocks.map((block, index) => (
          <EditorDocumentSidebarContentItem key={block.id} block={block} index={index} />
        ))}
      </ul>
    </DragDropProvider>
  );
}
