import useBlocks from '../use-blocks';
import useBlocksRichText from '../use-blocks-rich-text';
import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { ListContentBlock } from './schema';
import useListBlock from './use-list';
import listBlockStyles from './style.module.css';

export default function ListBlockRender({ id, type, attributes }: ListContentBlock) {
  const { handleSelectedContentBlock } = useBlocks();

  const { handleContentBlockRichTextSelect } = useBlocksRichText();

  const {
    listItemRefs,
    handleListItemInput,
    handleListItemPaste,
    handleListItemUpdate,
    handleNewListItemOnEnter,
    handleListBlockOnBackspace,
  } = useListBlock({
    id,
    attributes,
  });

  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const listStyle = attributes?.listStyle?.value ?? 'disc';

  const listBlockClass = listBlockStyles['block-list'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + listBlockClass;

  return (
    <ul
      {...blockAnchor}
      className={`block-list ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      data-block-list-style={listStyle}
      onClick={() => handleSelectedContentBlock(id)}
    >
      {attributes?.list?.items &&
        attributes.list.items.map((item) => {
          const itemIdValue = item.id.value;

          if (!itemIdValue) return;

          return (
            <li
              key={itemIdValue}
              ref={(el) => {
                listItemRefs.current[itemIdValue] = el;
              }}
              data-block-list-item-id={itemIdValue}
              data-block-attribute-key="content"
              data-block-placeholder="Type to add item..."
              data-block-content-type="rich-text"
              contentEditable={true}
              onInput={(e) => handleListItemInput({ e, itemId: itemIdValue })}
              onMouseUp={handleContentBlockRichTextSelect}
              onPaste={(e) => handleListItemPaste({ e, itemId: itemIdValue })}
              onKeyDown={(e) => {
                handleNewListItemOnEnter({ e, itemId: itemIdValue });
                handleListBlockOnBackspace({ e, blockId: id, itemId: itemIdValue });
              }}
              onBlur={() => handleListItemUpdate(itemIdValue)}
            />
          );
        })}
    </ul>
  );
}
