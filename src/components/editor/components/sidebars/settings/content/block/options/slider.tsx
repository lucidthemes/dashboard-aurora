import { useState } from 'react';

import { Slider } from '@/components/ui/slider';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';

import { useEditorStore } from '../../../../../../store/editor-store';
import type { ContentBlocks } from '../../../../../../schemas/content/content-blocks.schema';
import type { BlockAttributes, BlockOptionSlider } from '../../../../../../blocks/block.schema';

export default function EditorSettingsSidebarContentBlockTabOptionSlider({
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
    <div className="flex flex-col gap-y-2.5">
      <div className="flex items-center gap-x-2.5">
        <span
          className="flex h-4 w-4 items-center justify-center stroke-foreground [&>svg]:size-4!"
          dangerouslySetInnerHTML={{ __html: option.icon }}
        />
        <span className="text-sm font-medium">{option.title}</span>
      </div>
      <div className="flex flex-1 gap-x-4">
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
      </div>
    </div>
  );
}
