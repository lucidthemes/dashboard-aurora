'use client';

import { cn } from '@/lib/utils';

import { useEditorStore } from '../../../store/editor-store';
import EditorDocumentSidebarHeader from './header';
import EditorDocumentSidebarContent from './content';

export default function EditorDocumentSidebar() {
  const documentSidebarOpen = useEditorStore((state) => state.documentSidebarOpen);

  return (
    <div
      className={cn(
        'relative h-full overflow-hidden border-r bg-background transition-all duration-200',
        documentSidebarOpen ? 'w-[350px] opacity-100' : 'w-0 border-0 opacity-0',
      )}
    >
      <div className="absolute inset-0 flex flex-col">
        <EditorDocumentSidebarHeader />
        <div className="flex-1 overflow-y-auto">
          <EditorDocumentSidebarContent />
        </div>
      </div>
    </div>
  );
}
