import { Plus } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

import { useEditorStore } from '../../../../store/editor-store';

export default function EditorHeaderOptionsMobileOptionsMenuItemAdd() {
  const { blocksSidebarOpen, setBlocksSidebarOpen, setDocumentSidebarOpen } = useEditorStore(
    useShallow((state) => ({
      blocksSidebarOpen: state.blocksSidebarOpen,
      setBlocksSidebarOpen: state.setBlocksSidebarOpen,
      setDocumentSidebarOpen: state.setDocumentSidebarOpen,
    })),
  );

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => {
        setDocumentSidebarOpen(false);
        setBlocksSidebarOpen(!blocksSidebarOpen);
      }}
    >
      <Plus /> Add block
    </DropdownMenuItem>
  );
}
