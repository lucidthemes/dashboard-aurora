import { RulerDimensionLine, Minus } from 'lucide-react';

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

export default function EditorToolbarBlockSupportsWidth({
  block,
  blockSupports,
}: {
  block: ContentBlocks;
  blockSupports: BlockSupports;
}) {
  const updateContentBlockAttribute = useEditorStore((state) => state.updateContentBlockAttribute);

  if (!blockSupports.width || !blockSupports.width.options) return;

  const blockAttributes = block.attributes as BlockAttributes | undefined;

  const blockWidthValue =
    hasBlockAttribute(block.attributes, 'width') && blockAttributes?.width.type === 'plain-text'
      ? String(blockAttributes?.width.value)
      : 'standard';

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="cursor-pointer" title="Width">
          <RulerDimensionLine className="h-5 w-5 self-center stroke-foreground [&>svg]:size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Width</DropdownMenuLabel>
        {blockSupports.width.options?.map((option) => {
          const iconSizeClass =
            option === 'standard'
              ? 'h-4 w-4 [&>svg]:size-4!'
              : option === 'wide'
                ? 'h-5 w-5 [&>svg]:size-5!'
                : option === 'full'
                  ? 'h-6 w-6 [&>svg]:size-6!'
                  : 'h-4 w-4 [&>svg]:size-4!';

          return (
            <DropdownMenuItem
              key={option}
              className={`cursor-pointer capitalize ${blockWidthValue === option ? 'bg-muted' : ''}`}
              onClick={() =>
                updateContentBlockAttribute({
                  blockId: block.id,
                  blockType: block.type,
                  attribute: 'width',
                  value: option,
                })
              }
            >
              <Minus className={iconSizeClass} />
              {option}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
