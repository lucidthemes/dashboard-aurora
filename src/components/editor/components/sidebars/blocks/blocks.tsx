'use client';

import { useState, useEffect } from 'react';
import { useFloating, offset } from '@floating-ui/react';
import { cn } from '@/lib/utils';

import { useEditorStore } from '../../../store/editor-store';
import EditorBlocksSidebarHeader from './header';
import EditorBlocksSidebarContent from './content';
import EditorBlocksSidebarPreview from './preview';

export default function EditorBlocksSidebar() {
  const blocksSidebarOpen = useEditorStore((state) => state.blocksSidebarOpen);

  const [blocksSidebarPreviewOpen, setBlocksSidebarPreviewOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    open: blocksSidebarPreviewOpen,
    onOpenChange: setBlocksSidebarPreviewOpen,
    placement: 'right-start',
    strategy: 'fixed',
    middleware: [offset({ mainAxis: 15, crossAxis: 15 })],
  });

  useEffect(() => {
    const blocksSidebarElement = document.querySelector<HTMLElement>(`.editor-blocks-sidebar`);

    refs.setReference(blocksSidebarElement);
  }, [refs]);

  const { setFloating } = refs;

  return (
    <div
      className={cn(
        'editor-blocks-sidebar relative h-full overflow-hidden border-r bg-background transition-all duration-200',
        blocksSidebarOpen ? 'w-[350px] opacity-100' : 'w-0 border-0 opacity-0',
      )}
    >
      <div className="absolute inset-0 flex flex-col">
        <EditorBlocksSidebarHeader />
        <div className="flex-1 overflow-y-auto">
          <EditorBlocksSidebarContent setBlocksSidebarPreviewOpen={setBlocksSidebarPreviewOpen} />
        </div>
      </div>
      {blocksSidebarPreviewOpen && (
        <div ref={setFloating} style={{ ...floatingStyles, zIndex: 10 }}>
          <EditorBlocksSidebarPreview />
        </div>
      )}
    </div>
  );
}
