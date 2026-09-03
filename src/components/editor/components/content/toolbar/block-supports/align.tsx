import { TextAlignStart, TextAlignCenter, TextAlignEnd } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useEditorStore } from '../../../../store/editor-store';
import { hasBlockAttribute } from '../../../../utils/block-supports';
import type { ContentBlocks } from '../../../../schemas/content/content-blocks.schema';
import type { BlockAttributes, BlockSupports } from '../../../../blocks/block.schema';

export default function EditorToolbarBlockSupportsAlign({
  block,
  blockSupports,
}: {
  block: ContentBlocks;
  blockSupports: BlockSupports;
}) {
  const updateContentBlockAttribute = useEditorStore((state) => state.updateContentBlockAttribute);

  if (!blockSupports.align || !blockSupports.align.options) return;

  const blockAttributes = block.attributes as BlockAttributes | undefined;

  const blockAlignValue =
    hasBlockAttribute(block.attributes, 'align') && blockAttributes?.align.type === 'plain-text'
      ? blockAttributes?.align.value
      : 'left';

  const buttonIconClasses = 'h-5 w-5 self-center stroke-foreground [&>svg]:size-5';

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="cursor-pointer" title="Align">
          {blockAlignValue === 'left' ? (
            <TextAlignStart className={buttonIconClasses} />
          ) : blockAlignValue === 'center' ? (
            <TextAlignCenter className={buttonIconClasses} />
          ) : blockAlignValue === 'right' ? (
            <TextAlignEnd className={buttonIconClasses} />
          ) : (
            <TextAlignStart className={buttonIconClasses} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Align</DropdownMenuLabel>
        {blockSupports.align.options.map((option) => (
          <DropdownMenuItem
            key={option}
            className={`cursor-pointer capitalize ${blockAlignValue === option ? 'bg-muted' : ''}`}
            onClick={() =>
              updateContentBlockAttribute({
                blockId: block.id,
                blockType: block.type,
                attribute: 'align',
                value: option,
              })
            }
          >
            {option === 'left' ? (
              <TextAlignStart />
            ) : option === 'center' ? (
              <TextAlignCenter />
            ) : option === 'right' ? (
              <TextAlignEnd />
            ) : (
              <TextAlignStart />
            )}
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
