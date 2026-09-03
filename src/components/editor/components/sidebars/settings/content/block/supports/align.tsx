import { TextAlignStart, TextAlignCenter, TextAlignEnd } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import type { ContentBlocks } from '../../../../../../schemas/content/content-blocks.schema';
import type { BlockAttributes, BlockSupports } from '../../../../../../blocks/block.schema';
import { useEditorStore } from '../../../../../../store/editor-store';
import { hasBlockAttribute } from '../../../../../../utils/block-supports';

export default function EditorSettingsSidebarContentBlockTabSupportsAlign({
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

  return (
    <div className="flex flex-col gap-y-2.5">
      <div className="flex items-center gap-x-2.5">
        <TextAlignStart className="flex h-4 w-4 stroke-foreground" />
        <span className="text-sm font-medium">Align</span>
      </div>
      <ToggleGroup type="single" variant="outline" value={`align-${blockAlignValue}`} spacing={3}>
        {blockSupports.align.options.map((align) => (
          <ToggleGroupItem
            key={'align-' + align}
            value={'align-' + align}
            className="size-9.5 cursor-pointer"
            title={align.charAt(0).toUpperCase() + align.slice(1)}
            onClick={() =>
              updateContentBlockAttribute({
                blockId: block.id,
                blockType: block.type,
                attribute: 'align',
                value: align,
              })
            }
          >
            {align === 'left' ? (
              <TextAlignStart className="h-4 w-4 [&>svg]:size-4!" />
            ) : align === 'center' ? (
              <TextAlignCenter className="h-4 w-4 [&>svg]:size-4!" />
            ) : align === 'right' ? (
              <TextAlignEnd className="h-4 w-4 [&>svg]:size-4!" />
            ) : (
              <TextAlignStart className="h-4 w-4 [&>svg]:size-4!" />
            )}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
