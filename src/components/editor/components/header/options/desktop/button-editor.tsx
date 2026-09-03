import { StretchHorizontal, Code } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useEditorStore } from '../../../../store/editor-store';

export default function EditorHeaderButtonEditor() {
  const { editorContentBlocksStyle, setEditorContentBlocksStyle } = useEditorStore(
    useShallow((state) => ({
      editorContentBlocksStyle: state.editorContentBlocksStyle,
      setEditorContentBlocksStyle: state.setEditorContentBlocksStyle,
    })),
  );

  const blockItemBg = editorContentBlocksStyle === 'block' ? 'bg-secondary' : 'bg-background';
  const codeItemBg = editorContentBlocksStyle === 'code' ? 'bg-secondary' : 'bg-background';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer" title="Editor">
          {editorContentBlocksStyle === 'block' ? <StretchHorizontal /> : <Code />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Editor</DropdownMenuLabel>
        <DropdownMenuItem
          className={`cursor-pointer ${blockItemBg}`}
          onClick={() => setEditorContentBlocksStyle('block')}
        >
          <StretchHorizontal /> Block
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`cursor-pointer ${codeItemBg}`}
          onClick={() => setEditorContentBlocksStyle('code')}
        >
          <Code /> Code
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
