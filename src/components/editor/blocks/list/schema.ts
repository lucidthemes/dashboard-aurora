import { z } from 'zod';

import {
  BlockAttributesPlainTextSchema,
  BlockAttributesRichTextSchema,
  BlockAttributesArraySchema,
  BlockSupportsWidthSchema,
  BlockSupportsAlignSchema,
  BlockSchema,
} from '../block.schema';
import type { BlockOptionDropdown, EditorBlockInstance, ContentBlockInstance } from '../block.schema';

const ListBlockAttributeItemsSchema = z.object({
  id: BlockAttributesPlainTextSchema(z.uuid()),
  content: BlockAttributesRichTextSchema(z.string()),
});

export const ListBlockAttributesSchema = z.object({
  list: BlockAttributesArraySchema(ListBlockAttributeItemsSchema),
  listStyle: BlockAttributesPlainTextSchema(z.enum(['disc', 'number', 'none'])),
  width: BlockAttributesPlainTextSchema(BlockSupportsWidthSchema),
  align: BlockAttributesPlainTextSchema(BlockSupportsAlignSchema),
  anchor: BlockAttributesPlainTextSchema(z.string()),
  customClasses: BlockAttributesPlainTextSchema(z.string()),
});

export const ListContentBlockSchema = BlockSchema.extend({
  type: z.literal('list'),
  attributes: ListBlockAttributesSchema.partial().optional(),
});

type ListContentBlockAttributes = z.infer<typeof ListBlockAttributesSchema>;

type ListEditorBlockOptions = BlockOptionDropdown;

export type ListContentBlock = ContentBlockInstance<'list', ListContentBlockAttributes>;

export type ListContentBlockItem = z.infer<typeof ListBlockAttributeItemsSchema>;

export type ListEditorBlock = EditorBlockInstance<'list', 'text', ListEditorBlockOptions>;
