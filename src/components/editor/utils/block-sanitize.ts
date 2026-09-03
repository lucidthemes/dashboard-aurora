import DOMPurify from 'isomorphic-dompurify';

import type { ContentBlocks } from '../schemas/content/content-blocks.schema';
import type { BlockAttributeTypes, BlockAttributes } from '../blocks/block.schema';

const RICH_TEXT_ALLOWED_TAGS = ['strong', 'i', 'a', 'u', 's'];

export function sanitizeBlockAttribute({
  type,
  value,
}: {
  type: BlockAttributeTypes;
  value: string | number | boolean;
}) {
  switch (type) {
    case 'plain-text':
      return DOMPurify.sanitize(String(value), {
        ALLOWED_TAGS: [],
      });
    case 'rich-text':
      return DOMPurify.sanitize(String(value), {
        ALLOWED_TAGS: RICH_TEXT_ALLOWED_TAGS,
      });
    case 'number':
      return Number(value);
    case 'boolean':
      return Boolean(value);
    default:
      return undefined;
  }
}

export function sanitizeContentBlocks({ blocks }: { blocks: ContentBlocks[] }): ContentBlocks[] | undefined {
  if (!blocks) return undefined;

  const sanitizedContentBlocks = blocks.map((block) => {
    const blockAttributes = block.attributes as BlockAttributes | undefined;
    const blockAttributeKeys = Object.keys(blockAttributes as object);

    let cleanBlockAttributes = {};

    blockAttributeKeys.forEach((attribute) => {
      const blockAttribute = blockAttributes?.[attribute];

      if (!blockAttribute) return;

      if (blockAttribute.type != 'array') {
        const attributeValue = blockAttribute.value ?? '';

        const cleanAttributeValue = sanitizeBlockAttribute({
          type: blockAttribute.type,
          value: attributeValue,
        });

        cleanBlockAttributes = {
          ...cleanBlockAttributes,
          [attribute]: {
            type: blockAttribute.type,
            value: cleanAttributeValue,
          },
        };
      } else {
        const attributeArrayItems = blockAttribute.items ?? [];

        const cleanAttributeArrayItems = attributeArrayItems.map((item) => {
          const attributeArrayItemsKeys = Object.keys(item as object);

          let cleanAttributeArrayItem = {};

          attributeArrayItemsKeys.forEach((itemKey) => {
            const attributeType = item[itemKey].type;
            const attributeValue = item[itemKey].value ?? '';

            const cleanAttributeValue = sanitizeBlockAttribute({
              type: attributeType,
              value: attributeValue,
            });

            cleanAttributeArrayItem = {
              ...cleanAttributeArrayItem,
              [itemKey]: {
                type: attributeType,
                value: cleanAttributeValue,
              },
            };
          });

          return cleanAttributeArrayItem;
        });

        cleanBlockAttributes = {
          ...cleanBlockAttributes,
          [attribute]: {
            type: blockAttribute.type,
            items: cleanAttributeArrayItems,
          },
        };
      }
    });

    return {
      ...block,
      attributes: cleanBlockAttributes,
    };
  });

  return sanitizedContentBlocks;
}
