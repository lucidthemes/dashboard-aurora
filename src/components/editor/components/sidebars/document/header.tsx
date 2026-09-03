import { X } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/ui/button';

import { useEditorStore } from '../../../store/editor-store';

export default function EditorDocumentSidebarHeader() {
  const { documentSidebarOpen, setDocumentSidebarOpen } = useEditorStore(
    useShallow((state) => ({
      documentSidebarOpen: state.documentSidebarOpen,
      setDocumentSidebarOpen: state.setDocumentSidebarOpen,
    })),
  );

  return (
    <div className="flex items-center justify-between border-b py-2.5 pr-2.5 pl-5">
      <span className="text-sm font-medium">Document</span>
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer"
        onClick={() => setDocumentSidebarOpen(!documentSidebarOpen)}
      >
        <X />
      </Button>
    </div>
  );
}
