import { useRef } from 'react';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';

import { useEditorStore } from '../../../../store/editor-store';
import type { ContentBlocks } from '../../../../schemas/content/content-blocks.schema';
import type { BlockAttributes, BlockOptionForm } from '../../../../blocks/block.schema';

export default function EditorToolbarBlockOptionForm({
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
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="cursor-pointer" title={option.title}>
          <span
            className="flex h-6 w-6 items-center justify-center stroke-foreground [&>svg]:size-5!"
            dangerouslySetInnerHTML={{ __html: option.icon }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center">
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
                  variant="ghost"
                  size="icon-sm"
                  className="cursor-pointer"
                  title={field.button.title ?? ''}
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
      </PopoverContent>
    </Popover>
  );
}
