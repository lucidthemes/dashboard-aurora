import { z } from 'zod';

import {
  BlockAttributesPlainTextSchema,
  BlockSupportsWidthSchema,
  BlockSupportsAlignSchema,
  BlockSchema,
} from '../block.schema';
import type { BlockOptionDropdown, EditorBlockInstance, ContentBlockInstance } from '../block.schema';

export const VideoBlockAttributesSchema = z.object({
  url: BlockAttributesPlainTextSchema(z.url()),
  size: BlockAttributesPlainTextSchema(z.enum(['original', 'full'])),
  aspect: BlockAttributesPlainTextSchema(z.enum(['original', 'square', 'video', '2-3'])),
  width: BlockAttributesPlainTextSchema(BlockSupportsWidthSchema),
  align: BlockAttributesPlainTextSchema(BlockSupportsAlignSchema),
  anchor: BlockAttributesPlainTextSchema(z.string()),
  customClasses: BlockAttributesPlainTextSchema(z.string()),
});

export const VideoContentBlockSchema = BlockSchema.extend({
  type: z.literal('video'),
  attributes: VideoBlockAttributesSchema.partial().optional(),
});

type VideoContentBlockAttributes = z.infer<typeof VideoBlockAttributesSchema>;

type VideoEditorBlockOptions = BlockOptionDropdown;

export type VideoContentBlock = ContentBlockInstance<'video', VideoContentBlockAttributes>;

export type VideoEditorBlock = EditorBlockInstance<'video', 'media', VideoEditorBlockOptions>;
