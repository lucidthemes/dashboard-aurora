import { Plus, X } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/ui/button';

import { useEditorStore } from '../../../store/editor-store';

export default function EditorContentBlocksAddBlock({ index }: { index: number }) {
  const {
    insertContentBlockIndex,
    setInsertContentBlockIndex,
    resetInsertContentBlockIndex,
    setBlocksSidebarOpen,
    setDocumentSidebarOpen,
  } = useEditorStore(
    useShallow((state) => ({
      insertContentBlockIndex: state.insertContentBlockIndex,
      setInsertContentBlockIndex: state.setInsertContentBlockIndex,
      resetInsertContentBlockIndex: state.resetInsertContentBlockIndex,
      setBlocksSidebarOpen: state.setBlocksSidebarOpen,
      setDocumentSidebarOpen: state.setDocumentSidebarOpen,
    })),
  );

  const addBlockClasses =
    insertContentBlockIndex !== null && insertContentBlockIndex === index
      ? 'opacity-100'
      : 'opacity-0 hover:opacity-100';

  const currentBlockIndexNotActive =
    insertContentBlockIndex === null || (insertContentBlockIndex !== null && insertContentBlockIndex !== index);

  return (
    <div
      className={`relative mx-auto flex h-8 w-full justify-center py-1 transition-opacity duration-300 2xl:max-w-screen-xl ${addBlockClasses}`}
    >
      <div className="absolute top-4 h-0.75 w-full bg-secondary" />
      <Button
        variant="outline"
        size="icon-sm"
        className="z-1 flex max-h-6 max-w-6 cursor-pointer self-center"
        onClick={() => {
          if (currentBlockIndexNotActive) {
            setInsertContentBlockIndex(index);
            setBlocksSidebarOpen(true);
            setDocumentSidebarOpen(false);
          } else {
            resetInsertContentBlockIndex();
          }
        }}
        title={currentBlockIndexNotActive ? 'Add block' : 'Clear'}
      >
        {currentBlockIndexNotActive ? <Plus /> : <X />}
      </Button>
    </div>
  );
}
