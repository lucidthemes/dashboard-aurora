import { Undo } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/ui/button';

import { useEditorStore } from '../../../../store/editor-store';

export default function EditorHeaderButtonUndo() {
  const { editorContentBlocksHistory, editorContentBlocksHistoryIndex, undoEditorContentBlocksHistory } =
    useEditorStore(
      useShallow((state) => ({
        editorContentBlocksHistory: state.editorContentBlocksHistory,
        editorContentBlocksHistoryIndex: state.editorContentBlocksHistoryIndex,
        undoEditorContentBlocksHistory: state.undoEditorContentBlocksHistory,
      })),
    );

  const blocksHistoryLength = editorContentBlocksHistory.length;

  // if has history and history index null (undo not previously clicked) - not disabled
  // if has history and history index not equal to 0 (undo has been clicked) - not disabled
  const undoButtonStatus =
    (blocksHistoryLength > 0 && editorContentBlocksHistoryIndex === null) ||
    (blocksHistoryLength > 0 && editorContentBlocksHistoryIndex !== 0)
      ? false
      : true;

  return (
    <Button
      variant="outline"
      size="icon"
      className="cursor-pointer"
      disabled={undoButtonStatus}
      onClick={() => undoEditorContentBlocksHistory()}
      title="Undo"
    >
      <Undo />
    </Button>
  );
}
