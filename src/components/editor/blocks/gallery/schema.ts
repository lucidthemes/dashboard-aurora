import { z } from 'zod';

import {
  BlockAttributesPlainTextSchema,
  BlockAttributesNumberSchema,
  BlockAttributesArraySchema,
  BlockSupportsWidthSchema,
  BlockSchema,
} from '../block.schema';
import type { BlockOptionDropdown, EditorBlockInstance, ContentBlockInstance } from '../block.schema';

const GalleryBlockAttributeItemsSchema = z.object({
  id: BlockAttributesPlainTextSchema(z.uuid()),
  url: BlockAttributesPlainTextSchema(z.url()),
  altText: BlockAttributesPlainTextSchema(z.string()).optional(),
});

export const GalleryBlockAttributesSchema = z.object({
  images: BlockAttributesArraySchema(GalleryBlockAttributeItemsSchema),
  columns: BlockAttributesNumberSchema(z.int().positive().gte(1).lte(4)),
  width: BlockAttributesPlainTextSchema(BlockSupportsWidthSchema),
  anchor: BlockAttributesPlainTextSchema(z.string()),
  customClasses: BlockAttributesPlainTextSchema(z.string()),
});

export const GalleryContentBlockSchema = BlockSchema.extend({
  type: z.literal('gallery'),
  attributes: GalleryBlockAttributesSchema.partial().optional(),
});

type GalleryContentBlockAttributes = z.infer<typeof GalleryBlockAttributesSchema>;

type GalleryEditorBlockOptions = BlockOptionDropdown;

export type GalleryContentBlock = ContentBlockInstance<'gallery', GalleryContentBlockAttributes>;

export type GalleryContentBlockItem = z.infer<typeof GalleryBlockAttributeItemsSchema>;

export type GalleryEditorBlock = EditorBlockInstance<'gallery', 'media', GalleryEditorBlockOptions>;
