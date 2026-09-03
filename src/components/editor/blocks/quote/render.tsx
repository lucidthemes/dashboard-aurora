import useBlocks from '../use-blocks';
import useBlocksRichText from '../use-blocks-rich-text';
import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { QuoteContentBlock } from './schema';
import useQuoteBlock from './use-quote';
import quoteBlockStyles from './style.module.css';

export default function QuoteBlockRender({ id, type, attributes }: QuoteContentBlock) {
  const {
    handleSelectedContentBlock,
    handleBlockContentInput,
    handleBlockContentPaste,
    handleBlockContentUpdate,
    handleRemoveBlockOnBackspace,
    handleNewParagraphBlockOnEnter,
  } = useBlocks();

  const { handleContentBlockRichTextSelect } = useBlocksRichText();

  const { quoteContentRef, quoteCiteRef, handleQuoteContentOnEnter, handleQuoteCiteOnBackspace } = useQuoteBlock({
    attributes,
  });

  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const quoteBlockClass = quoteBlockStyles['block-quote'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + quoteBlockClass;

  return (
    <blockquote
      {...blockAnchor}
      className={`block-quote ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      onClick={() => handleSelectedContentBlock(id)}
    >
      <p
        ref={quoteContentRef}
        data-block-attribute-key="content"
        data-block-placeholder="Type to add quote..."
        data-block-content-type="rich-text"
        contentEditable={true}
        onInput={(e) => handleBlockContentInput({ e, blockContentRef: quoteContentRef, blockContentType: 'rich-text' })}
        onMouseUp={handleContentBlockRichTextSelect}
        onPaste={(e) => handleBlockContentPaste({ e, blockContentRef: quoteContentRef })}
        onKeyDown={(e) => {
          handleQuoteContentOnEnter(e);
          handleRemoveBlockOnBackspace({ e, blockRef: quoteContentRef, blockId: id });
        }}
        onBlur={() =>
          handleBlockContentUpdate({
            blockId: id,
            blockType: type,
            blockAttribute: 'content',
            blockAttributeValue: attributes?.content?.value,
            blockContentRef: quoteContentRef,
            blockContentType: 'rich-text',
          })
        }
      />
      <cite
        ref={quoteCiteRef}
        data-block-attribute-key="cite"
        data-block-placeholder="Type to add cite..."
        data-block-content-type="rich-text"
        contentEditable={true}
        onInput={(e) => handleBlockContentInput({ e, blockContentRef: quoteCiteRef, blockContentType: 'rich-text' })}
        onMouseUp={handleContentBlockRichTextSelect}
        onPaste={(e) => handleBlockContentPaste({ e, blockContentRef: quoteCiteRef })}
        onKeyDown={(e) => {
          handleQuoteCiteOnBackspace(e);
          handleNewParagraphBlockOnEnter({ e, blockRef: quoteCiteRef });
        }}
        onBlur={() =>
          handleBlockContentUpdate({
            blockId: id,
            blockType: type,
            blockAttribute: 'cite',
            blockAttributeValue: attributes?.cite?.value,
            blockContentRef: quoteCiteRef,
            blockContentType: 'rich-text',
          })
        }
      />
    </blockquote>
  );
}
