import { z } from 'zod';

import {
  BlockAttributesPlainTextSchema,
  BlockAttributesRichTextSchema,
  BlockAttributesNumberSchema,
  BlockSupportsWidthSchema,
  BlockSupportsAlignSchema,
  BlockSchema,
} from '../block.schema';
import type { BlockOptionDropdown, EditorBlockInstance, ContentBlockInstance } from '../block.schema';

export const HeadingBlockAttributesSchema = z.object({
  content: BlockAttributesRichTextSchema(z.string()),
  level: BlockAttributesNumberSchema(z.int().positive().gte(1).lte(6)),
  width: BlockAttributesPlainTextSchema(BlockSupportsWidthSchema),
  align: BlockAttributesPlainTextSchema(BlockSupportsAlignSchema),
  anchor: BlockAttributesPlainTextSchema(z.string()),
  customClasses: BlockAttributesPlainTextSchema(z.string()),
});

export const HeadingContentBlockSchema = BlockSchema.extend({
  type: z.literal('heading'),
  attributes: HeadingBlockAttributesSchema.partial().optional(),
});

type HeadingContentBlockAttributes = z.infer<typeof HeadingBlockAttributesSchema>;

type HeadingEditorBlockOptions = BlockOptionDropdown;

export type HeadingContentBlock = ContentBlockInstance<'heading', HeadingContentBlockAttributes>;

export type HeadingEditorBlock = EditorBlockInstance<'heading', 'text', HeadingEditorBlockOptions>;
