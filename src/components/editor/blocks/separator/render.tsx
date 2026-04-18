import { Separator } from '@/components/ui/separator';

import useBlocks from '../use-blocks';
import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { SeparatorContentBlock } from './schema';
import separatorBlockStyles from './style.module.css';

export default function SeparatorBlockRender({ id, type, attributes }: SeparatorContentBlock) {
  const { handleSelectedContentBlock } = useBlocks();

  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const separatorBlockClass = separatorBlockStyles['block-separator'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + separatorBlockClass;

  return (
    <div
      {...blockAnchor}
      className={`block-separator ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      onClick={() => handleSelectedContentBlock(id)}
    >
      <Separator orientation="horizontal" />
    </div>
  );
}
