import useBlocks from '../use-blocks';
import useBlocksRichText from '../use-blocks-rich-text';
import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { ParagraphContentBlock } from './schema';
import useParagraphBlock from './use-paragraph';
import paragraphBlockStyles from './style.module.css';

export default function ParagraphBlockRender({ id, type, attributes }: ParagraphContentBlock) {
  const {
    handleSelectedContentBlock,
    handleBlockContentInput,
    handleBlockContentPaste,
    handleBlockContentUpdate,
    handleRemoveBlockOnBackspace,
    handleNewParagraphBlockOnEnter,
  } = useBlocks();

  const { handleContentBlockRichTextSelect } = useBlocksRichText();

  const { paragraphContentRef } = useParagraphBlock({ attributes });

  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const paragraphBlockClass = paragraphBlockStyles['block-paragraph'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + paragraphBlockClass;

  return (
    <p
      ref={paragraphContentRef}
      {...blockAnchor}
      className={`block-paragraph ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-attribute-key="content"
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      data-block-placeholder="Type to add paragraph..."
      data-block-content-type="rich-text"
      contentEditable={true}
      onClick={() => handleSelectedContentBlock(id)}
      onInput={(e) =>
        handleBlockContentInput({ e, blockContentRef: paragraphContentRef, blockContentType: 'rich-text' })
      }
      onMouseUp={handleContentBlockRichTextSelect}
      onPaste={(e) => handleBlockContentPaste({ e, blockContentRef: paragraphContentRef })}
      onKeyDown={(e) => {
        handleRemoveBlockOnBackspace({ e, blockRef: paragraphContentRef, blockId: id });
        handleNewParagraphBlockOnEnter({ e, blockRef: paragraphContentRef });
      }}
      onBlur={() =>
        handleBlockContentUpdate({
          blockId: id,
          blockType: type,
          blockAttribute: 'content',
          blockAttributeValue: attributes?.content?.value,
          blockContentRef: paragraphContentRef,
          blockContentType: 'rich-text',
        })
      }
    />
  );
}
