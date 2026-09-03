import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { useEditorStore } from '../../../../store/editor-store';
import type { ContentBlocks } from '../../../../schemas/content/content-blocks.schema';
import type { BlockAttributes, BlockOptionToggle } from '../../../../blocks/block.schema';

export default function EditorToolbarBlockOptionToggle({
  block,
  option,
}: {
  block: ContentBlocks;
  option: BlockOptionToggle;
}) {
  const updateContentBlockAttribute = useEditorStore((state) => state.updateContentBlockAttribute);

  if (!block || !option) return;

  const blockAttributes = block.attributes as BlockAttributes | undefined;

  const blockAttribute = blockAttributes?.[option.attribute];

  const blockAttributeValue =
    blockAttribute && blockAttribute.type === 'boolean' ? Boolean(blockAttribute.value) : undefined;

  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="cursor-pointer" title={option.title}>
          <span
            className="flex h-6 w-6 items-center justify-center stroke-foreground [&>svg]:size-5!"
            dangerouslySetInnerHTML={{ __html: option.icon }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="flex items-center justify-between">
        <Label htmlFor={option.name}>{option.label}</Label>
        <Switch
          id={option.name}
          title={option.label}
          className="cursor-pointer"
          checked={blockAttributeValue}
          onCheckedChange={(checked) =>
            updateContentBlockAttribute({
              blockId: block.id,
              blockType: block.type,
              attribute: option.attribute,
              value: checked,
            })
          }
        />
      </PopoverContent>
    </Popover>
  );
}
