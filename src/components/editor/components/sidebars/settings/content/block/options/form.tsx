import { useRef } from 'react';
import { Check } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';

import { useEditorStore } from '../../../../../../store/editor-store';
import type { ContentBlocks } from '../../../../../../schemas/content/content-blocks.schema';
import type { BlockAttributes, BlockOptionForm } from '../../../../../../blocks/block.schema';

export default function EditorSettingsSidebarContentBlockTabOptionForm({
  block,
  option,
}: {
  block: ContentBlocks;
  option: BlockOptionForm;
}) {
  const updateContentBlockAttribute = useEditorStore((state) => state.updateContentBlockAttribute);

  const formFieldInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const blockAttributes = block.attributes as BlockAttributes | undefined;

  return (
    <div className="flex flex-col gap-y-2.5">
      <div className="flex items-center gap-x-2.5">
        <span
          className="flex h-4 w-4 items-center justify-center stroke-foreground [&>svg]:size-4!"
          dangerouslySetInnerHTML={{ __html: option.icon }}
        />
        <span className="text-sm font-medium">{option.title}</span>
      </div>
      <div key={block.id}>
        {option.fields.map((field) => {
          const blockAttribute = blockAttributes?.[field.attribute];

          const blockAttributeValue = blockAttribute && blockAttribute.type !== 'array' ? blockAttribute.value : '';

          return (
            <InputGroup key={field.name}>
              <InputGroupInput
                ref={(el) => {
                  formFieldInputRefs.current[field.id] = el;
                }}
                id={field.id}
                name={field.name}
                defaultValue={blockAttributeValue as string}
                placeholder={field.placeholder ?? ''}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  title={field.button.title ?? ''}
                  size="icon-xs"
                  className="cursor-pointer"
                  onClick={() => {
                    const fieldInputRef = formFieldInputRefs.current[field.id];

                    if (!fieldInputRef) return;

                    const value = fieldInputRef.value;

                    if (value !== blockAttributeValue) {
                      updateContentBlockAttribute({
                        blockId: block.id,
                        blockType: block.type,
                        attribute: field.attribute,
                        value,
                      });
                    }
                  }}
                >
                  {field.button.icon ? (
                    <span
                      className="h-5 w-5 self-center stroke-foreground [&>svg]:size-5!"
                      dangerouslySetInnerHTML={{ __html: field.button.icon }}
                    />
                  ) : (
                    <Check className="h-5 w-5 self-center stroke-foreground [&>svg]:size-5" />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          );
        })}
      </div>
    </div>
  );
}
