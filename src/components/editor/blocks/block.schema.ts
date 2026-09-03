import type { ComponentType } from 'react';
import { z } from 'zod';

import type { EditorBlocks } from '../schemas/content/editor-blocks.schema';
import type { ContentBlocks } from '../schemas/content/content-blocks.schema';

import type { ParagraphContentBlock } from './paragraph/schema';
import type { HeadingContentBlock } from './heading/schema';
import type { SeparatorContentBlock } from './separator/schema';
import type { ListContentBlock, ListContentBlockItem } from './list/schema';
import type { ImageContentBlock } from './image/schema';
import type { VideoContentBlock } from './video/schema';
import type { QuoteContentBlock } from './quote/schema';
import type { PullquoteContentBlock } from './pullquote/schema';
import type { MediaTextContentBlock } from './media-text/schema';
import type { GalleryContentBlock, GalleryContentBlockItem } from './gallery/schema';
import type { ButtonContentBlock } from './button/schema';
import type { CodeContentBlock } from './code/schema';

// Block types

export const BlockTypesSchema = z.enum([
  'paragraph',
  'heading',
  'separator',
  'list',
  'image',
  'video',
  'quote',
  'pullquote',
  'mediaText',
  'gallery',
  'button',
  'code',
]);

export type BlockTypes = z.infer<typeof BlockTypesSchema>;

// Block categories

export const BlockCategoriesSchema = z.enum(['text', 'media', 'design']);

export type BlockCategories = z.infer<typeof BlockCategoriesSchema>;

// Block attributes

export const BlockAttributesPlainTextSchema = <T extends z.ZodType<string>>(valueSchema: T) =>
  z.object({
    type: z.literal('plain-text'),
    value: valueSchema.optional(),
  });

export const BlockAttributesRichTextSchema = <T extends z.ZodType<string>>(valueSchema: T) =>
  z.object({
    type: z.literal('rich-text'),
    value: valueSchema.optional(),
  });

export const BlockAttributesNumberSchema = <T extends z.ZodType<number>>(valueSchema: T) =>
  z.object({
    type: z.literal('number'),
    value: valueSchema.optional(),
  });

export const BlockAttributesBooleanSchema = <T extends z.ZodType<boolean>>(valueSchema: T) =>
  z.object({
    type: z.literal('boolean'),
    value: valueSchema.optional(),
  });

export const BlockAttributesArraySchema = <T extends z.ZodType<object>>(arraySchema: T) =>
  z.object({
    type: z.literal('array'),
    items: z.array(arraySchema).optional(),
  });

export type BlockAttributeTypes = 'plain-text' | 'rich-text' | 'number' | 'boolean' | 'array';

export type BlockAttribute = {
  type: Exclude<BlockAttributeTypes, 'array'>;
  value?: string | number | boolean;
};

export type BlockAttributeArray = {
  type: 'array';
  items?: Record<string, BlockAttribute>[];
};

export type BlockAttributeValue = BlockAttribute | BlockAttributeArray;

export type BlockAttributes = Record<string, BlockAttributeValue>;

// Block supports

export const BlockSupportsWidthSchema = z.enum(['standard', 'wide', 'full']);

type BlockSupportsWidth = z.infer<typeof BlockSupportsWidthSchema>;

export const BlockSupportsAlignSchema = z.enum(['left', 'center', 'right']);

type BlockSupportsAlign = z.infer<typeof BlockSupportsAlignSchema>;

export type BlockSupports = {
  width?: {
    options?: BlockSupportsWidth[];
  };
  align?: {
    options?: BlockSupportsAlign[];
  };
  richText?: boolean;
  anchor?: boolean;
  customClasses?: boolean;
};

// Block options

export type BaseBlockOption = {
  name: string;
  title: string;
  icon: string;
  showInToolbar: boolean;
  changeIconOnUpdate: boolean;
};

export type BlockOptionDropdown = BaseBlockOption & {
  type: 'dropdown';
  attribute: string;
  items?: {
    id: string;
    label: string;
    value: string | number;
    icon?: string;
  }[];
};

export type BlockOptionForm = BaseBlockOption & {
  type: 'form';
  fields: {
    id: string;
    name: string;
    attribute: string;
    placeholder?: string;
    button: {
      title: string;
      icon?: string;
    };
  }[];
};

export type BlockOptionSlider = BaseBlockOption & {
  type: 'slider';
  attribute: string;
  control: {
    min: number;
    max: number;
    step: number;
  };
  input?: {
    show: boolean;
    measurement?: 'percentage' | 'pixel';
  };
};

export type BlockOptionToggle = BaseBlockOption & {
  type: 'toggle';
  attribute: string;
  label: string;
};

export type BlockOptions = BlockOptionDropdown | BlockOptionForm | BlockOptionSlider | BlockOptionToggle;

// Editor Blocks (block list, block toolbar, block sidebar)

export type EditorBlockInstance<
  TBlockType extends BlockTypes,
  TBlockCategory extends BlockCategories,
  TBlockOptions extends BlockOptions = never,
> = {
  type: TBlockType;
  title: string;
  category: TBlockCategory;
  description?: string;
  icon: string;
  supports?: BlockSupports;
  options?: TBlockOptions[];
};

// Content blocks

export const BlockSchema = z.object({
  id: z.uuid(),
});

export type ContentBlockInstance<TBlockType extends BlockTypes, TContentBlockAttributes> = {
  id: string;
  type: TBlockType;
  attributes?: Partial<TContentBlockAttributes>;
};

// Block registry

type BlockRegistryRenderMap = {
  paragraph: ComponentType<ParagraphContentBlock>;
  heading: ComponentType<HeadingContentBlock>;
  separator: ComponentType<SeparatorContentBlock>;
  list: ComponentType<ListContentBlock>;
  image: ComponentType<ImageContentBlock>;
  video: ComponentType<VideoContentBlock>;
  quote: ComponentType<QuoteContentBlock>;
  pullquote: ComponentType<PullquoteContentBlock>;
  mediaText: ComponentType<MediaTextContentBlock>;
  gallery: ComponentType<GalleryContentBlock>;
  button: ComponentType<ButtonContentBlock>;
  code: ComponentType<CodeContentBlock>;
};

type BlockTypesWithItems = {
  list: ListContentBlockItem;
  gallery: GalleryContentBlockItem;
};

type BlockRegistryItem<K extends BlockTypes> = {
  meta: Extract<EditorBlocks, { type: K }>;
  render: BlockRegistryRenderMap[K];
  create: () => Extract<ContentBlocks, { type: K }>;
} & (K extends keyof BlockTypesWithItems
  ? {
      createItem: () => BlockTypesWithItems[K];
    }
  : unknown);

export type BlockRegistry = {
  [K in BlockTypes]: BlockRegistryItem<K>;
};
