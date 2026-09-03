import { GripVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';

import editorBlockStyles from '../../../styles/editor.module.css';
import { blockWidthClass } from '../../../blocks/block-utils';

export default function EditorContentBlocksRenderBlockWrapper({
  id,
  blockDragRef,
  blockDragHandleRef,
  children,
  width = 'standard',
}: {
  id: string;
  blockDragRef: (element: Element | null) => void;
  blockDragHandleRef: (element: Element | null) => void;
  children: React.ReactNode;
  width?: 'standard' | 'wide' | 'full';
}) {
  const editorBlockClass = editorBlockStyles['editor-block'];

  const editorBlockWrapperWidth = blockWidthClass(width);

  const editorBlockWrapperPadding = width === 'full' ? 'pr-10' : '';

  return (
    <div
      ref={blockDragRef}
      className={`editor-block ${editorBlockClass} ${editorBlockWrapperWidth} ${editorBlockWrapperPadding} group mx-auto flex w-full gap-x-5`}
      data-block-id={id}
    >
      <Button
        size="icon-sm"
        variant="ghost"
        className="max-h-5 max-w-5 cursor-grab self-center hover:bg-background"
        title="Drag"
        tabIndex={-1}
        ref={blockDragHandleRef}
        data-block-drag-handle
      >
        <GripVertical className="h-5 w-5 transition-opacity duration-250 md:opacity-0 md:group-hover:opacity-100 [&>svg]:size-5" />
      </Button>
      {children}
    </div>
  );
}
