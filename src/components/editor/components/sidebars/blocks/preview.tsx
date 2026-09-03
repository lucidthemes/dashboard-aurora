'use client';

import { useEditorStore } from '../../../store/editor-store';
import { blockRegistry } from '../../../blocks/blocks';

export default function EditorBlocksSidebarPreview() {
  const hoveredblocksSidebarBlock = useEditorStore((state) => state.hoveredblocksSidebarBlock);

  if (!hoveredblocksSidebarBlock) return;

  const blockMeta = blockRegistry[hoveredblocksSidebarBlock].meta;

  return (
    <div className="flex w-60 flex-col gap-y-2.5 rounded-md border bg-sidebar p-4">
      <div className="flex items-center gap-x-2.5">
        {blockMeta.icon && (
          <span
            className="flex h-5 w-5 items-center justify-center"
            dangerouslySetInnerHTML={{ __html: blockMeta.icon }}
          />
        )}
        {blockMeta.title && <span className="text-sm text-foreground">{blockMeta.title}</span>}
      </div>
      {blockMeta.description && <p className="text-sm text-foreground">{blockMeta.description}</p>}
    </div>
  );
}
