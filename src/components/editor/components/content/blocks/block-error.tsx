'use client';

import { useState } from 'react';
import { Component, ReactNode } from 'react';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import type { ContentBlocks } from '../../../schemas/content/content-blocks.schema';
import { useEditorStore } from '../../../store/editor-store';

function BlockErrorContent({ block, error }: { block: ContentBlocks; error?: string }) {
  const [open, setOpen] = useState(false);

  const removeContentBlock = useEditorStore((state) => state.removeContentBlock);

  return (
    <div className="flex w-full flex-col gap-y-4 rounded-md border bg-sidebar p-4">
      <div className="flex items-center justify-between">
        <span className="text-base font-medium">This block encountered an error</span>
        <div className="flex gap-x-4">
          <Button
            variant="outline"
            size="icon-sm"
            className="cursor-pointer"
            title="View details"
            onClick={() => setOpen((prevState) => !prevState)}
          >
            {!open ? <ChevronDown /> : <ChevronUp />}
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="cursor-pointer"
            title="Remove block"
            onClick={() => removeContentBlock(block.id)}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
      {open && (
        <>
          <Separator />
          <div className="flex flex-col gap-y-2">
            <span className="text-sm font-medium">Id: {block.id}</span>
            <span className="text-sm font-medium">Type: {block.type}</span>
            {error && <span className="text-sm font-medium">Error: {error}</span>}
          </div>
        </>
      )}
    </div>
  );
}

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  block: ContentBlocks;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class EditorContentBlocksRenderBlockError extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    if (this.state.hasError) {
      const block = this.props.block;

      return <BlockErrorContent block={block} error={this.state.error?.message} />;
    }

    return this.props.children;
  }
}
