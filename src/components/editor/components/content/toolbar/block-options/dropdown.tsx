import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useEditorStore } from '../../../../store/editor-store';
import type { ContentBlocks } from '../../../../schemas/content/content-blocks.schema';
import type { BlockAttributes, BlockOptionDropdown } from '../../../../blocks/block.schema';

export default function EditorToolbarBlockOptionDropdown({
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

  let dropdownTriggerIcon = '';

  if (option.changeIconOnUpdate) {
    const optionValueIcon = option.items.find((item) => item.value === blockAttributeValue);

    dropdownTriggerIcon = optionValueIcon?.icon ?? option.icon;
  } else {
    dropdownTriggerIcon = option.icon;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="cursor-pointer" title={option.title}>
          <span
            className="flex h-6 w-6 items-center justify-center stroke-foreground [&>svg]:size-5!"
            dangerouslySetInnerHTML={{ __html: dropdownTriggerIcon }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">{option.title}</DropdownMenuLabel>
        {option.items.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className={`cursor-pointer ${item.value === blockAttributeValue ? 'bg-muted' : ''}`}
            onClick={() =>
              updateContentBlockAttribute({
                blockId: block.id,
                blockType: block.type,
                attribute: option.attribute,
                value: item.value,
              })
            }
          >
            {item.icon && (
              <span
                className="flex h-4 w-4 items-center justify-center"
                dangerouslySetInnerHTML={{ __html: item.icon }}
              />
            )}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
