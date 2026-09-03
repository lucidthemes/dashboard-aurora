import { useShallow } from 'zustand/react/shallow';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/components/editor/store/editor-store';

export default function EditorContentBlocksEmptyBlock() {
  const { setBlocksSidebarOpen, setDocumentSidebarOpen } = useEditorStore(
    useShallow((state) => ({
      setBlocksSidebarOpen: state.setBlocksSidebarOpen,
      setDocumentSidebarOpen: state.setDocumentSidebarOpen,
    })),
  );

  return (
    <Button
      variant="outline"
      size="icon"
      className="cursor-pointer self-center"
      onClick={() => {
        setBlocksSidebarOpen(true);
        setDocumentSidebarOpen(false);
      }}
      title="Add block"
    >
      <Plus />
    </Button>
  );
}
