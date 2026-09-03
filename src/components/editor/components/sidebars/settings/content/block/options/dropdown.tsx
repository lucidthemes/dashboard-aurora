import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { useEditorStore } from '../../../../../../store/editor-store';
import type { ContentBlocks } from '../../../../../../schemas/content/content-blocks.schema';
import type { BlockAttributes, BlockOptionDropdown } from '../../../../../../blocks/block.schema';

export default function EditorSettingsSidebarContentBlockTabOptionDropdown({
  block,
  option,
}: {
  block: ContentBlocks;
  option: BlockOptionDropdown;
}) {
  const updateContentBlockAttribute = useEditorStore((state) => state.updateContentBlockAttribute);

  if (!block || !option || !option.items) return;

  const blockAttributes = block.attributes as BlockAttributes | undefined;

  const blockAttribute = blockAttributes?.[option.attribute];

  const blockAttributeValue = blockAttribute && blockAttribute.type !== 'array' ? blockAttribute.value : '';

  return (
    <div className="flex flex-col gap-y-2.5">
      <div className="flex items-center gap-x-2.5">
        <span
          className="flex h-4 w-4 items-center justify-center stroke-foreground [&>svg]:size-4!"
          dangerouslySetInnerHTML={{ __html: option.icon }}
        />
        <span className="text-sm font-medium">{option.title}</span>
      </div>
      <ToggleGroup type="single" variant="outline" value={blockAttributeValue as string} spacing={3}>
        {option.items.map((item) => (
          <ToggleGroupItem
            key={item.id}
            value={item.value as string}
            className="size-9.5 cursor-pointer"
            title={item.label}
            onClick={() =>
              updateContentBlockAttribute({
                blockId: block.id,
                blockType: block.type,
                attribute: option.attribute,
                value: item.value,
              })
            }
          >
            <span
              className="flex h-4 w-4 items-center justify-center"
              dangerouslySetInnerHTML={{ __html: item.icon ?? option.icon }}
            />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
