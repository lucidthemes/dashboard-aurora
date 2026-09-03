import { Layers } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/ui/button';

import { useEditorStore } from '../../../../store/editor-store';

export default function EditorHeaderButtonDocument() {
  const { documentSidebarOpen, setBlocksSidebarOpen, setDocumentSidebarOpen } = useEditorStore(
    useShallow((state) => ({
      documentSidebarOpen: state.documentSidebarOpen,
      setBlocksSidebarOpen: state.setBlocksSidebarOpen,
      setDocumentSidebarOpen: state.setDocumentSidebarOpen,
    })),
  );

  return (
    <Button
      variant={!documentSidebarOpen ? 'outline' : 'default'}
      size="icon"
      className="cursor-pointer"
      onClick={() => {
        setBlocksSidebarOpen(false);
        setDocumentSidebarOpen(!documentSidebarOpen);
      }}
      title="Document overview"
    >
      <Layers />
    </Button>
  );
}
