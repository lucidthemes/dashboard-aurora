import { useShallow } from 'zustand/react/shallow';
import { useSortable } from '@dnd-kit/react/sortable';

import { DeleteButton } from '@/components/buttons';

import { useEditorStore } from '../../../../store/editor-store';
import { blockRegistry } from '../../../../blocks/blocks';
import type { ContentBlocks } from '../../../../schemas/content/content-blocks.schema';

export default function EditorDocumentSidebarContentItem({ block, index }: { block: ContentBlocks; index: number }) {
  const { selectedContentBlock, setSelectedContentBlock, removeContentBlock } = useEditorStore(
    useShallow((state) => ({
      selectedContentBlock: state.selectedContentBlock,
      setSelectedContentBlock: state.setSelectedContentBlock,
      removeContentBlock: state.removeContentBlock,
    })),
  );

  const { ref } = useSortable({ id: block.id, index });

  const blockMeta = blockRegistry[block.type].meta;

  return (
    <li
      key={block.id}
      ref={ref}
      tabIndex={0}
      className={`group group flex min-h-13 w-full cursor-grab justify-between rounded-sm p-2.5 hover:bg-muted ${block.id === selectedContentBlock ? 'bg-muted' : ''}`}
      onClick={() => setSelectedContentBlock(block.id)}
      data-editor-sidebar-document-item
    >
      <div className="flex items-center gap-x-2.5 text-sm">
        <span className="h-5 w-5 fill-foreground [&>svg]:size-5" dangerouslySetInnerHTML={{ __html: blockMeta.icon }} />
        {blockMeta.title}
      </div>
      <DeleteButton
        className="hidden group-hover:flex"
        onClick={() => removeContentBlock(block.id)}
        title="Remove block"
      />
    </li>
  );
}
