import { z } from 'zod';

import {
  BlockAttributesPlainTextSchema,
  BlockAttributesRichTextSchema,
  BlockAttributesNumberSchema,
  BlockSupportsWidthSchema,
  BlockSupportsAlignSchema,
  BlockSchema,
} from '../block.schema';
import type {
  BlockOptionDropdown,
  BlockOptionSlider,
  EditorBlockInstance,
  ContentBlockInstance,
} from '../block.schema';

export const MediaTextBlockAttributesSchema = z.object({
  mediaType: BlockAttributesPlainTextSchema(z.enum(['image', 'video'])),
  mediaUrl: BlockAttributesPlainTextSchema(z.url()),
  mediaAltText: BlockAttributesPlainTextSchema(z.string()),

  mediaPosition: BlockAttributesPlainTextSchema(z.enum(['left', 'right'])),
  mediaWidth: BlockAttributesNumberSchema(z.int().positive().gte(1).lte(100)),
  mediaSize: BlockAttributesPlainTextSchema(z.enum(['original', 'full'])),
  mediaAspect: BlockAttributesPlainTextSchema(z.enum(['original', 'square', 'video', '2-3'])),
  text: BlockAttributesRichTextSchema(z.string()),
  textPosition: BlockAttributesPlainTextSchema(z.enum(['top', 'center', 'bottom'])),
  width: BlockAttributesPlainTextSchema(BlockSupportsWidthSchema),
  align: BlockAttributesPlainTextSchema(BlockSupportsAlignSchema),
  anchor: BlockAttributesPlainTextSchema(z.string()),
  customClasses: BlockAttributesPlainTextSchema(z.string()),
});

export const MediaTextContentBlockSchema = BlockSchema.extend({
  type: z.literal('mediaText'),
  attributes: MediaTextBlockAttributesSchema.partial().optional(),
});

type MediaTextContentBlockAttributes = z.infer<typeof MediaTextBlockAttributesSchema>;

type MediaTextEditorBlockOptions = BlockOptionDropdown | BlockOptionSlider;

export type MediaTextContentBlock = ContentBlockInstance<'mediaText', MediaTextContentBlockAttributes>;

export type MediaTextEditorBlock = EditorBlockInstance<'mediaText', 'media', MediaTextEditorBlockOptions>;
