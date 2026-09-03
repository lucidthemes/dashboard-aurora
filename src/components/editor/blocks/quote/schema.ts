import { z } from 'zod';

import {
  BlockAttributesPlainTextSchema,
  BlockAttributesRichTextSchema,
  BlockSupportsWidthSchema,
  BlockSupportsAlignSchema,
  BlockSchema,
} from '../block.schema';
import type { EditorBlockInstance, ContentBlockInstance } from '../block.schema';

export const QuoteBlockAttributesSchema = z.object({
  content: BlockAttributesRichTextSchema(z.string()),
  cite: BlockAttributesRichTextSchema(z.string()),
  width: BlockAttributesPlainTextSchema(BlockSupportsWidthSchema),
  align: BlockAttributesPlainTextSchema(BlockSupportsAlignSchema),
  anchor: BlockAttributesPlainTextSchema(z.string()),
  customClasses: BlockAttributesPlainTextSchema(z.string()),
});

export const QuoteContentBlockSchema = BlockSchema.extend({
  type: z.literal('quote'),
  attributes: QuoteBlockAttributesSchema.partial().optional(),
});

type QuoteContentBlockAttributes = z.infer<typeof QuoteBlockAttributesSchema>;

export type QuoteContentBlock = ContentBlockInstance<'quote', QuoteContentBlockAttributes>;

export type QuoteEditorBlock = EditorBlockInstance<'quote', 'text'>;
