import { useRef } from 'react';
import { Check } from 'lucide-react';

import { Field, FieldDescription } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';

import { useEditorStore } from '../../../../../../store/editor-store';
import type { ContentBlocks } from '../../../../../../schemas/content/content-blocks.schema';
import type { BlockAttributes, BlockSupports } from '../../../../../../blocks/block.schema';
import { hasBlockAttribute } from '../../../../../../utils/block-supports';

export default function EditorSettingsSidebarContentBlockTabAdvancedCustomClasses({
  block,
  blockSupports,
}: {
  block: ContentBlocks;
  blockSupports: BlockSupports;
}) {
  const updateContentBlockAttribute = useEditorStore((state) => state.updateContentBlockAttribute);

  const customClassesInputRef = useRef<HTMLInputElement | null>(null);

  if (!blockSupports.customClasses) return;

  const blockAttributes = block.attributes as BlockAttributes | undefined;

  const blockCustomClassesValue =
    hasBlockAttribute(block.attributes, 'customClasses') && blockAttributes?.customClasses.type === 'plain-text'
      ? String(blockAttributes?.customClasses.value)
      : '';

  return (
    <div className="flex flex-col gap-y-2.5">
      <span className="text-sm font-medium">Custom CSS class(es)</span>
      <Field key={block.id}>
        <InputGroup>
          <InputGroupInput ref={customClassesInputRef} defaultValue={blockCustomClassesValue} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Save"
              title="Save"
              size="icon-xs"
              className="cursor-pointer"
              onClick={() => {
                if (!customClassesInputRef.current) return;

                const value = customClassesInputRef.current.value;

                if (value !== blockCustomClassesValue) {
                  updateContentBlockAttribute({
                    blockId: block.id,
                    blockType: block.type,
                    attribute: 'customClasses',
                    value,
                  });
                }
              }}
            >
              <Check />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Separate classes with a comma</FieldDescription>
      </Field>
    </div>
  );
}
