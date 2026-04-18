'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../../store/editor-store';
import { blockRegistry } from '../../../blocks/blocks';
import { blockCategories } from '../../../blocks/categories';

export default function EditorBlocksSidebarContent({
  setBlocksSidebarPreviewOpen,
}: {
  setBlocksSidebarPreviewOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { contentBlocks, addContentBlock, setBlocksSidebarHoveredBlock, resetBlocksSidebarHoveredBlock } =
    useEditorStore(
      useShallow((state) => ({
        contentBlocks: state.editorContent?.content,
        addContentBlock: state.addContentBlock,
        setBlocksSidebarHoveredBlock: state.setBlocksSidebarHoveredBlock,
        resetBlocksSidebarHoveredBlock: state.resetBlocksSidebarHoveredBlock,
      })),
    );

  const blockList = Object.values(blockRegistry).map((block) => block.meta);

  const blockListSections = blockCategories.map((category) => {
    const categoryBlocks = blockList.filter((block) => block.category === category.name);

    return {
      name: category.name,
      title: category.title,
      blocks: categoryBlocks,
    };
  });

  const totalContentBlocks = contentBlocks?.length ?? 1;

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <ul className="flex flex-col gap-y-10">
        {blockListSections.map((section) => (
          <li key={section.name} className="flex flex-col gap-y-5" aria-label={section.title}>
            <span className="text-sm font-medium">{section.title}</span>
            <ul className="flex flex-col gap-y-5" data-block-section={section.name}>
              {section.blocks.map((block) => (
                <li
                  key={block.type}
                  className="group flex w-full cursor-pointer items-center gap-x-2.5 rounded-sm border-1 p-2.5 hover:bg-muted"
                  data-block-type={block.type}
                  onClick={() => addContentBlock({ blockType: block.type, order: totalContentBlocks + 1 })}
                  onMouseOver={() => {
                    setBlocksSidebarPreviewOpen(true);
                    setBlocksSidebarHoveredBlock(block.type);
                  }}
                  onMouseLeave={() => {
                    setBlocksSidebarPreviewOpen(false);
                    resetBlocksSidebarHoveredBlock();
                  }}
                >
                  {block.icon && (
                    <span
                      className="flex h-5 w-5 items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: block.icon }}
                    />
                  )}
                  {block.title && (
                    <span className="text-sm text-muted-foreground group-hover:text-foreground">{block.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
