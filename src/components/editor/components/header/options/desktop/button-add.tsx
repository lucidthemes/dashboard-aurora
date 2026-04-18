import { Plus, X } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/ui/button';

import { useEditorStore } from '../../../../store/editor-store';

export default function EditorHeaderButtonAdd() {
  const { blocksSidebarOpen, setBlocksSidebarOpen, setDocumentSidebarOpen } = useEditorStore(
    useShallow((state) => ({
      blocksSidebarOpen: state.blocksSidebarOpen,
      setBlocksSidebarOpen: state.setBlocksSidebarOpen,
      setDocumentSidebarOpen: state.setDocumentSidebarOpen,
    })),
  );

  return (
    <Button
      variant={!blocksSidebarOpen ? 'outline' : 'default'}
      size="icon"
      className="cursor-pointer"
      onClick={() => {
        setDocumentSidebarOpen(false);
        setBlocksSidebarOpen(!blocksSidebarOpen);
      }}
      title="Add block"
    >
      {!blocksSidebarOpen ? <Plus /> : <X />}
    </Button>
  );
}
