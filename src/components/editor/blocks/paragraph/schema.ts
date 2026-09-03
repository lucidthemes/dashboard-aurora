import { z } from 'zod';

import {
  BlockAttributesPlainTextSchema,
  BlockAttributesRichTextSchema,
  BlockSupportsWidthSchema,
  BlockSupportsAlignSchema,
  BlockSchema,
} from '../block.schema';
import type { EditorBlockInstance, ContentBlockInstance } from '../block.schema';

export const ParagraphBlockAttributesSchema = z.object({
  content: BlockAttributesRichTextSchema(z.string()),
  width: BlockAttributesPlainTextSchema(BlockSupportsWidthSchema),
  align: BlockAttributesPlainTextSchema(BlockSupportsAlignSchema),
  anchor: BlockAttributesPlainTextSchema(z.string()),
  customClasses: BlockAttributesPlainTextSchema(z.string()),
});

export const ParagraphContentBlockSchema = BlockSchema.extend({
  type: z.literal('paragraph'),
  attributes: ParagraphBlockAttributesSchema.partial().optional(),
});

type ParagraphContentBlockAttributes = z.infer<typeof ParagraphBlockAttributesSchema>;

export type ParagraphContentBlock = ContentBlockInstance<'paragraph', ParagraphContentBlockAttributes>;

export type ParagraphEditorBlock = EditorBlockInstance<'paragraph', 'text'>;
