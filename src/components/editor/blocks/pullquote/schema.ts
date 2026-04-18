import { z } from 'zod';

import {
  BlockAttributesPlainTextSchema,
  BlockAttributesRichTextSchema,
  BlockSupportsWidthSchema,
  BlockSupportsAlignSchema,
  BlockSchema,
} from '../block.schema';
import type { EditorBlockInstance, ContentBlockInstance } from '../block.schema';

export const PullquoteBlockAttributesSchema = z.object({
  content: BlockAttributesRichTextSchema(z.string()),
  cite: BlockAttributesRichTextSchema(z.string()),
  width: BlockAttributesPlainTextSchema(BlockSupportsWidthSchema),
  align: BlockAttributesPlainTextSchema(BlockSupportsAlignSchema),
  anchor: BlockAttributesPlainTextSchema(z.string()),
  customClasses: BlockAttributesPlainTextSchema(z.string()),
});

export const PullquoteContentBlockSchema = BlockSchema.extend({
  type: z.literal('pullquote'),
  attributes: PullquoteBlockAttributesSchema.partial().optional(),
});

type PullquoteContentBlockAttributes = z.infer<typeof PullquoteBlockAttributesSchema>;

export type PullquoteContentBlock = ContentBlockInstance<'pullquote', PullquoteContentBlockAttributes>;

export type PullquoteEditorBlock = EditorBlockInstance<'pullquote', 'text'>;
