import { useRef } from 'react';
import { Check } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';

import { useEditorStore } from '../../../../../../store/editor-store';
import type { ContentBlocks } from '../../../../../../schemas/content/content-blocks.schema';
import type { BlockAttributes, BlockSupports } from '../../../../../../blocks/block.schema';
import { hasBlockAttribute } from '../../../../../../utils/block-supports';

export default function EditorSettingsSidebarContentBlockTabAdvancedAnchor({
  block,
  blockSupports,
}: {
  block: ContentBlocks;
  blockSupports: BlockSupports;
}) {
  const updateContentBlockAttribute = useEditorStore((state) => state.updateContentBlockAttribute);

  const anchorInputRef = useRef<HTMLInputElement | null>(null);

  if (!blockSupports.anchor) return;

  const blockAttributes = block.attributes as BlockAttributes | undefined;

  const blockAnchorValue =
    hasBlockAttribute(block.attributes, 'anchor') && blockAttributes?.anchor.type === 'plain-text'
      ? String(blockAttributes?.anchor.value)
      : '';

  return (
    <div className="flex flex-col gap-y-2.5">
      <span className="text-sm font-medium">HTML anchor</span>
      <InputGroup key={block.id}>
        <InputGroupInput ref={anchorInputRef} defaultValue={blockAnchorValue} />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Save"
            title="Save"
            size="icon-xs"
            className="cursor-pointer"
            onClick={() => {
              if (!anchorInputRef.current) return;

              const value = anchorInputRef.current.value;

              if (value !== blockAnchorValue) {
                updateContentBlockAttribute({ blockId: block.id, blockType: block.type, attribute: 'anchor', value });
              }
            }}
          >
            <Check />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
