import { EllipsisVertical, Trash, Copy } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useEditorStore } from '../../../store/editor-store';

export default function EditorToolbarOptions({ blockId }: { blockId: string }) {
  const { removeContentBlock, duplicateContentBlock } = useEditorStore(
    useShallow((state) => ({
      removeContentBlock: state.removeContentBlock,
      duplicateContentBlock: state.duplicateContentBlock,
    })),
  );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="cursor-pointer" title="Options">
          <EllipsisVertical className="h-5 w-5 self-center stroke-foreground [&>svg]:size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Options</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer" onClick={() => duplicateContentBlock(blockId)}>
          <Copy /> Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" variant="destructive" onClick={() => removeContentBlock(blockId)}>
          <Trash /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
