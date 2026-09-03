import useBlocks from '../use-blocks';
import useBlocksRichText from '../use-blocks-rich-text';
import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { HeadingContentBlock } from './schema';
import useHeadingBlock from './use-heading';
import headingBlockStyles from './style.module.css';

export default function HeadingBlockRender({ id, type, attributes }: HeadingContentBlock) {
  const {
    handleSelectedContentBlock,
    handleBlockContentInput,
    handleBlockContentPaste,
    handleBlockContentUpdate,
    handleRemoveBlockOnBackspace,
    handleNewParagraphBlockOnEnter,
  } = useBlocks();

  const { handleContentBlockRichTextSelect } = useBlocksRichText();

  const { headingContentRef } = useHeadingBlock({ attributes });

  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const HeadingBlockTag = `h${attributes?.level?.value || 2}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  const headingBlockClass = headingBlockStyles['block-heading'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + headingBlockClass;

  return (
    <HeadingBlockTag
      ref={headingContentRef}
      {...blockAnchor}
      className={`block-heading ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-attribute-key="content"
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      data-block-placeholder="Type to add heading..."
      data-block-content-type="rich-text"
      contentEditable={true}
      onClick={() => handleSelectedContentBlock(id)}
      onInput={(e) => handleBlockContentInput({ e, blockContentRef: headingContentRef, blockContentType: 'rich-text' })}
      onMouseUp={handleContentBlockRichTextSelect}
      onPaste={(e) => handleBlockContentPaste({ e, blockContentRef: headingContentRef })}
      onKeyDown={(e) => {
        handleRemoveBlockOnBackspace({ e, blockRef: headingContentRef, blockId: id });
        handleNewParagraphBlockOnEnter({ e, blockRef: headingContentRef });
      }}
      onBlur={() =>
        handleBlockContentUpdate({
          blockId: id,
          blockType: type,
          blockAttribute: 'content',
          blockAttributeValue: attributes?.content?.value,
          blockContentRef: headingContentRef,
          blockContentType: 'rich-text',
        })
      }
    />
  );
}
