import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';

import { useEditorStore } from '../../../../store/editor-store';
import type { ContentBlocks } from '../../../../schemas/content/content-blocks.schema';
import type { BlockAttributes, BlockOptionSlider } from '../../../../blocks/block.schema';

export default function EditorToolbarBlockOptionSlider({
  block,
  option,
}: {
  block: ContentBlocks;
  option: BlockOptionSlider;
}) {
  const updateContentBlockAttribute = useEditorStore((state) => state.updateContentBlockAttribute);

  const blockAttributes = block.attributes as BlockAttributes | undefined;

  const blockAttribute = blockAttributes?.[option.attribute];

  const blockAttributeValue = blockAttribute && blockAttribute.type === 'number' ? Number(blockAttribute.value) : 50;

  const [sliderValue, setSliderValue] = useState<number[]>([blockAttributeValue]);

  if (!block || !option) return;

  const convertedSliderValue = sliderValue.toString();

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
      <PopoverContent align="center" className="flex flex-1 gap-x-4">
        <Slider
          min={option.control.min ?? 0}
          max={option.control.max ?? 100}
          step={option.control.step ?? 1}
          className="mx-auto w-full max-w-xs"
          value={sliderValue}
          title={convertedSliderValue}
          onValueChange={(value) => setSliderValue(value as number[])}
          onValueCommit={() => {
            if (convertedSliderValue) {
              updateContentBlockAttribute({
                blockId: block.id,
                blockType: block.type,
                attribute: option.attribute,
                value: convertedSliderValue,
              });
            }
          }}
        />
        {option.input?.show && (
          <InputGroup className="basis-20">
            <InputGroupInput value={convertedSliderValue} readOnly className="pr-1! pl-0! text-right text-sm" />
            {option.input?.measurement && (
              <InputGroupAddon align="inline-end" className="pr-2!">
                {option.input?.measurement === 'percentage' && <InputGroupText className="text-sm">%</InputGroupText>}
                {option.input?.measurement === 'pixel' && <InputGroupText className="text-sm">px</InputGroupText>}
              </InputGroupAddon>
            )}
          </InputGroup>
        )}
      </PopoverContent>
    </Popover>
  );
}
