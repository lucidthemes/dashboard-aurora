import { z } from 'zod';

import {
  BlockAttributesPlainTextSchema,
  BlockSupportsWidthSchema,
  BlockSupportsAlignSchema,
  BlockSchema,
} from '../block.schema';
import type { BlockOptionDropdown, EditorBlockInstance, ContentBlockInstance } from '../block.schema';

export const ImageBlockAttributesSchema = z.object({
  url: BlockAttributesPlainTextSchema(z.url()),
  altText: BlockAttributesPlainTextSchema(z.string()),
  caption: BlockAttributesPlainTextSchema(z.string()),
  size: BlockAttributesPlainTextSchema(z.enum(['original', 'full'])),
  aspect: BlockAttributesPlainTextSchema(z.enum(['original', 'square', 'video', '2-3'])),
  width: BlockAttributesPlainTextSchema(BlockSupportsWidthSchema),
  align: BlockAttributesPlainTextSchema(BlockSupportsAlignSchema),
  anchor: BlockAttributesPlainTextSchema(z.string()),
  customClasses: BlockAttributesPlainTextSchema(z.string()),
});

export const ImageContentBlockSchema = BlockSchema.extend({
  type: z.literal('image'),
  attributes: ImageBlockAttributesSchema.partial().optional(),
});

type ImageContentBlockAttributes = z.infer<typeof ImageBlockAttributesSchema>;

type ImageEditorBlockOptions = BlockOptionDropdown;

export type ImageContentBlock = ContentBlockInstance<'image', ImageContentBlockAttributes>;

export type ImageEditorBlock = EditorBlockInstance<'image', 'media', ImageEditorBlockOptions>;
