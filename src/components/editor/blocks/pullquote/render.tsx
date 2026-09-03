import useBlocks from '../use-blocks';
import useBlocksRichText from '../use-blocks-rich-text';
import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { PullquoteContentBlock } from './schema';
import usePullquoteBlock from './use-pullquote';
import pullquoteBlockStyles from './style.module.css';

export default function PullquoteBlockRender({ id, type, attributes }: PullquoteContentBlock) {
  const {
    handleSelectedContentBlock,
    handleBlockContentInput,
    handleBlockContentPaste,
    handleBlockContentUpdate,
    handleRemoveBlockOnBackspace,
    handleNewParagraphBlockOnEnter,
  } = useBlocks();

  const { handleContentBlockRichTextSelect } = useBlocksRichText();

  const { pullquoteContentRef, pullquoteCiteRef, handlePullquoteContentOnEnter, handlePullquoteCiteOnBackspace } =
    usePullquoteBlock({
      attributes,
    });

  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const pullquoteBlockClass = pullquoteBlockStyles['block-pullquote'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + pullquoteBlockClass;

  return (
    <figure
      {...blockAnchor}
      className={`block-quote ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      onClick={() => handleSelectedContentBlock(id)}
    >
      <blockquote>
        <p
          ref={pullquoteContentRef}
          data-block-attribute-key="content"
          data-block-placeholder="Type to add quote..."
          data-block-content-type="rich-text"
          contentEditable={true}
          onInput={(e) =>
            handleBlockContentInput({ e, blockContentRef: pullquoteContentRef, blockContentType: 'rich-text' })
          }
          onMouseUp={handleContentBlockRichTextSelect}
          onPaste={(e) => handleBlockContentPaste({ e, blockContentRef: pullquoteContentRef })}
          onBlur={() =>
            handleBlockContentUpdate({
              blockId: id,
              blockType: type,
              blockAttribute: 'content',
              blockAttributeValue: attributes?.content?.value,
              blockContentRef: pullquoteContentRef,
              blockContentType: 'rich-text',
            })
          }
          onKeyDown={(e) => {
            handlePullquoteContentOnEnter(e);
            handleRemoveBlockOnBackspace({ e, blockRef: pullquoteContentRef, blockId: id });
          }}
        />
        <cite
          ref={pullquoteCiteRef}
          data-block-attribute-key="cite"
          data-block-placeholder="Type to add cite..."
          data-block-content-type="rich-text"
          contentEditable={true}
          onInput={(e) =>
            handleBlockContentInput({ e, blockContentRef: pullquoteCiteRef, blockContentType: 'rich-text' })
          }
          onMouseUp={handleContentBlockRichTextSelect}
          onPaste={(e) => handleBlockContentPaste({ e, blockContentRef: pullquoteCiteRef })}
          onKeyDown={(e) => {
            handlePullquoteCiteOnBackspace(e);
            handleNewParagraphBlockOnEnter({ e, blockRef: pullquoteCiteRef });
          }}
          onBlur={() =>
            handleBlockContentUpdate({
              blockId: id,
              blockType: type,
              blockAttribute: 'cite',
              blockAttributeValue: attributes?.cite?.value,
              blockContentRef: pullquoteCiteRef,
              blockContentType: 'rich-text',
            })
          }
        />
      </blockquote>
    </figure>
  );
}
