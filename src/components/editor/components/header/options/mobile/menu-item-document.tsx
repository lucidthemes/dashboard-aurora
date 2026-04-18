import { Layers } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

import { useEditorStore } from '../../../../store/editor-store';

export default function EditorHeaderOptionsMobileOptionsMenuItemDocument() {
  const { documentSidebarOpen, setBlocksSidebarOpen, setDocumentSidebarOpen } = useEditorStore(
    useShallow((state) => ({
      documentSidebarOpen: state.documentSidebarOpen,
      setBlocksSidebarOpen: state.setBlocksSidebarOpen,
      setDocumentSidebarOpen: state.setDocumentSidebarOpen,
    })),
  );

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => {
        setBlocksSidebarOpen(false);
        setDocumentSidebarOpen(!documentSidebarOpen);
      }}
    >
      <Layers /> Document
    </DropdownMenuItem>
  );
}
