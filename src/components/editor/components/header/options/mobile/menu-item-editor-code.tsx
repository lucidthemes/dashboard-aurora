import { Code } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

import { useEditorStore } from '../../../../store/editor-store';

export default function EditorHeaderOptionsMobileOptionsMenuItemEditorCode() {
  const { editorContentBlocksStyle, setEditorContentBlocksStyle } = useEditorStore(
    useShallow((state) => ({
      editorContentBlocksStyle: state.editorContentBlocksStyle,
      setEditorContentBlocksStyle: state.setEditorContentBlocksStyle,
    })),
  );

  const menuItemBg = editorContentBlocksStyle === 'code' ? 'bg-secondary' : 'bg-background';

  return (
    <DropdownMenuItem className={`cursor-pointer ${menuItemBg}`} onClick={() => setEditorContentBlocksStyle('code')}>
      <Code /> Code
    </DropdownMenuItem>
  );
}
