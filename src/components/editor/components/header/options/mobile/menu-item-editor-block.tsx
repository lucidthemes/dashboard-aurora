import { StretchHorizontal } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

import { useEditorStore } from '../../../../store/editor-store';

export default function EditorHeaderOptionsMobileOptionsMenuItemEditorBlock() {
  const { editorContentBlocksStyle, setEditorContentBlocksStyle } = useEditorStore(
    useShallow((state) => ({
      editorContentBlocksStyle: state.editorContentBlocksStyle,
      setEditorContentBlocksStyle: state.setEditorContentBlocksStyle,
    })),
  );

  const menuItemBg = editorContentBlocksStyle === 'block' ? 'bg-secondary' : 'bg-background';

  return (
    <DropdownMenuItem className={`cursor-pointer ${menuItemBg}`} onClick={() => setEditorContentBlocksStyle('block')}>
      <StretchHorizontal /> Block
    </DropdownMenuItem>
  );
}
