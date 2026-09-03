import { Redo } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/ui/button';

import { useEditorStore } from '../../../../store/editor-store';

export default function EditorHeaderButtonRedo() {
  const { editorContentBlocksHistory, editorContentBlocksHistoryIndex, redoEditorContentBlocksHistory } =
    useEditorStore(
      useShallow((state) => ({
        editorContentBlocksHistory: state.editorContentBlocksHistory,
        editorContentBlocksHistoryIndex: state.editorContentBlocksHistoryIndex,
        redoEditorContentBlocksHistory: state.redoEditorContentBlocksHistory,
      })),
    );

  const blocksHistoryLength = editorContentBlocksHistory.length;

  // if has history
  // and history index is not null (undo has been clicked)
  // and history length - 1 (required to compare history length to history index) does not equal history index
  // then button not disabled
  const redoButtonStatus =
    blocksHistoryLength > 0 &&
    editorContentBlocksHistoryIndex !== null &&
    blocksHistoryLength - 1 !== editorContentBlocksHistoryIndex
      ? false
      : true;

  return (
    <Button
      variant="outline"
      size="icon"
      className="cursor-pointer"
      disabled={redoButtonStatus}
      onClick={() => redoEditorContentBlocksHistory()}
      title="Redo"
    >
      <Redo />
    </Button>
  );
}
