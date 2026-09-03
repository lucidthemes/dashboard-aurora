'use client';

import { X } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/ui/button';

import { useEditorStore } from '../../../store/editor-store';

export default function EditorBlocksSidebarHeader() {
  const { blocksSidebarOpen, setBlocksSidebarOpen } = useEditorStore(
    useShallow((state) => ({
      blocksSidebarOpen: state.blocksSidebarOpen,
      setBlocksSidebarOpen: state.setBlocksSidebarOpen,
    })),
  );

  return (
    <div className="flex items-center justify-between border-b py-2.5 pr-2.5 pl-5">
      <span className="text-sm font-medium">Blocks</span>
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer"
        onClick={() => setBlocksSidebarOpen(!blocksSidebarOpen)}
      >
        <X />
      </Button>
    </div>
  );
}
