import { EllipsisVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import EditorHeaderOptionsMobileOptionsMenuItemAdd from './menu-item-add';
import EditorHeaderOptionsMobileOptionsMenuItemDocument from './menu-item-document';
import EditorHeaderOptionsMobileOptionsMenuItemUndo from './menu-item-undo';
import EditorHeaderOptionsMobileOptionsMenuItemRedo from './menu-item-redo';
import EditorHeaderOptionsMobileOptionsMenuItemEditorBlock from './menu-item-editor-block';
import EditorHeaderOptionsMobileOptionsMenuItemEditorCode from './menu-item-editor-code';

export default function EditorHeaderOptionsMobileOptionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer md:hidden" title="Options">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <EditorHeaderOptionsMobileOptionsMenuItemAdd />
          <EditorHeaderOptionsMobileOptionsMenuItemDocument />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <EditorHeaderOptionsMobileOptionsMenuItemUndo />
          <EditorHeaderOptionsMobileOptionsMenuItemRedo />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Editor</DropdownMenuLabel>
          <EditorHeaderOptionsMobileOptionsMenuItemEditorBlock />
          <EditorHeaderOptionsMobileOptionsMenuItemEditorCode />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
