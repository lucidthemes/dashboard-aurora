import useBlocks from '../use-blocks';
import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { CodeContentBlock } from './schema';
import useCodeBlock from './use-code';
import codeBlockStyles from './style.module.css';

export default function CodeBlockRender({ id, type, attributes }: CodeContentBlock) {
  const { handleSelectedContentBlock, handleBlockContentInput, handleBlockContentPaste, handleBlockContentUpdate } =
    useBlocks();

  const { codeContentRef } = useCodeBlock({ attributes });

  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const codeBlockClass = codeBlockStyles['block-code'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + codeBlockClass;

  return (
    <pre
      {...blockAnchor}
      className={`block-code ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      onClick={() => handleSelectedContentBlock(id)}
    >
      <code
        ref={codeContentRef}
        data-block-attribute-key="content"
        data-block-placeholder="Type to add code..."
        data-block-content-type="plain-text"
        contentEditable="plaintext-only"
        onInput={(e) => handleBlockContentInput({ e, blockContentRef: codeContentRef, blockContentType: 'plain-text' })}
        onPaste={(e) => handleBlockContentPaste({ e, blockContentRef: codeContentRef })}
        onBlur={() =>
          handleBlockContentUpdate({
            blockId: id,
            blockType: type,
            blockAttribute: 'content',
            blockAttributeValue: attributes?.content?.value,
            blockContentRef: codeContentRef,
            blockContentType: 'plain-text',
          })
        }
      />
    </pre>
  );
}
