import { RulerDimensionLine, Minus } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import type { ContentBlocks } from '../../../../../../schemas/content/content-blocks.schema';
import type { BlockAttributes, BlockSupports } from '../../../../../../blocks/block.schema';
import { useEditorStore } from '../../../../../../store/editor-store';
import { hasBlockAttribute } from '../../../../../../utils/block-supports';

export default function EditorSettingsSidebarContentBlockTabSupportsWidth({
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
    <div className="flex flex-col gap-y-2.5">
      <div className="flex items-center gap-x-2.5">
        <RulerDimensionLine className="flex h-4 w-4 stroke-foreground" />
        <span className="text-sm font-medium">Width</span>
      </div>
      <ToggleGroup type="single" variant="outline" value={`width-${blockWidthValue}`} spacing={3}>
        {blockSupports.width.options.map((width) => {
          const iconSizeClass =
            width === 'standard'
              ? 'h-4 w-4 [&>svg]:size-4!'
              : width === 'wide'
                ? 'h-5 w-5 [&>svg]:size-5!'
                : width === 'full'
                  ? 'h-6 w-6 [&>svg]:size-6!'
                  : 'h-4 w-4 [&>svg]:size-4!';
          return (
            <ToggleGroupItem
              key={'width-' + width}
              value={'width-' + width}
              className="size-9.5 cursor-pointer"
              title={width.charAt(0).toUpperCase() + width.slice(1)}
              onClick={() =>
                updateContentBlockAttribute({
                  blockId: block.id,
                  blockType: block.type,
                  attribute: 'width',
                  value: width,
                })
              }
            >
              <Minus className={iconSizeClass} />
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
}
