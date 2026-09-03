import { Fragment } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

import { useEditorStore } from '../../../store/editor-store';
import EditorContentBlocksRenderBlock from './render-block';
import EditorContentBlocksAddBlock from './add-block';
import EditorContentBlocksEmptyBlock from './empty-block';

export default function EditorContentBlocks() {
  const { contentBlocks, dragContentBlock, resetSelectedContentBlock } = useEditorStore(
    useShallow((state) => ({
      contentBlocks: state.editorContent?.content,
      dragContentBlock: state.dragContentBlock,
      resetSelectedContentBlock: state.resetSelectedContentBlock,
    })),
  );

  if (!contentBlocks || contentBlocks.length === 0) return <EditorContentBlocksEmptyBlock />;

  return (
    <DragDropProvider
      onDragStart={(event) => {
        if (!event) return;

        const { source } = event.operation;

        if (isSortable(source)) {
          resetSelectedContentBlock();
        }
      }}
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source } = event.operation;

        if (isSortable(source)) {
          const { initialIndex, index, id } = source;

          dragContentBlock({ blockId: id as string, currentPosition: initialIndex, newPosition: index });
        }
      }}
    >
      <div id="editor-content-blocks" className="flex flex-col">
        {contentBlocks.map((block, index) => (
          <Fragment key={block.id}>
            <EditorContentBlocksRenderBlock block={block} index={index} />
            <EditorContentBlocksAddBlock index={index} />
          </Fragment>
        ))}
      </div>
    </DragDropProvider>
  );
}
