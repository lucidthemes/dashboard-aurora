import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { useEditorStore } from '../../../../../../store/editor-store';
import type { ContentBlocks } from '../../../../../../schemas/content/content-blocks.schema';
import type { BlockAttributes, BlockOptionToggle } from '../../../../../../blocks/block.schema';

export default function EditorSettingsSidebarContentBlockTabOptionToggle({
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
    <div className="flex flex-col gap-y-2.5">
      <div className="flex items-center gap-x-2.5">
        <span
          className="flex h-4 w-4 items-center justify-center stroke-foreground [&>svg]:size-4!"
          dangerouslySetInnerHTML={{ __html: option.icon }}
        />
        <span className="text-sm font-medium">{option.title}</span>
      </div>
      <div className="flex items-center justify-between">
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
      </div>
    </div>
  );
}
