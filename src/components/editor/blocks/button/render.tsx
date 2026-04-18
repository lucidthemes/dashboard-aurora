import Link from 'next/link';

import useBlocks from '../use-blocks';
import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { ButtonContentBlock } from './schema';
import useButtonBlock from './use-button';
import buttonBlockStyles from './style.module.css';

export default function ButtonBlockRender({ id, type, attributes }: ButtonContentBlock) {
  const { handleSelectedContentBlock, handleBlockContentInput, handleBlockContentPaste, handleBlockContentUpdate } =
    useBlocks();

  const { buttonTextRef, handleButtonOnEnter } = useButtonBlock({ attributes });

  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const newTab = attributes?.newTab?.value === true ? '_blank' : '_self';

  const buttonBlockClass = buttonBlockStyles['block-button'];
  const buttonBlockLinkClass = buttonBlockStyles['block-button-link'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + buttonBlockClass;

  return (
    <div
      {...blockAnchor}
      className={`block-button ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      onClick={() => handleSelectedContentBlock(id)}
    >
      <Link className={buttonBlockLinkClass} href="" target={newTab}>
        <span
          ref={buttonTextRef}
          data-block-attribute-key="text"
          data-block-placeholder="Type to add text..."
          data-block-content-type="plain-text"
          contentEditable={true}
          onInput={(e) =>
            handleBlockContentInput({ e, blockContentRef: buttonTextRef, blockContentType: 'plain-text' })
          }
          onPaste={(e) => handleBlockContentPaste({ e, blockContentRef: buttonTextRef })}
          onKeyDown={handleButtonOnEnter}
          onBlur={() =>
            handleBlockContentUpdate({
              blockId: id,
              blockType: type,
              blockAttribute: 'content',
              blockAttributeValue: attributes?.text?.value,
              blockContentRef: buttonTextRef,
              blockContentType: 'plain-text',
            })
          }
        />
      </Link>
    </div>
  );
}
