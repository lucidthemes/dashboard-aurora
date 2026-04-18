import { Separator } from '@/components/ui/separator';

import EditorHeaderButtonAdd from './button-add';
import EditorHeaderButtonDocument from './button-document';
import EditorHeaderButtonUndo from './button-undo';
import EditorHeaderButtonRedo from './button-redo';
import EditorHeaderButtonEditor from './button-editor';

export default function EditorHeaderOptionsDesktopButtons() {
  return (
    <div className="hidden gap-x-5 md:flex">
      <EditorHeaderButtonAdd />
      <EditorHeaderButtonDocument />
      <Separator orientation="vertical" />
      <EditorHeaderButtonUndo />
      <EditorHeaderButtonRedo />
      <Separator orientation="vertical" />
      <EditorHeaderButtonEditor />
    </div>
  );
}
