import { z } from 'zod';

import { ParagraphContentBlockSchema } from '../../blocks/paragraph/schema';
import { HeadingContentBlockSchema } from '../../blocks/heading/schema';
import { SeparatorContentBlockSchema } from '../../blocks/separator/schema';
import { ListContentBlockSchema } from '../../blocks/list/schema';
import { ImageContentBlockSchema } from '../../blocks/image/schema';
import { VideoContentBlockSchema } from '../../blocks/video/schema';
import { QuoteContentBlockSchema } from '../../blocks/quote/schema';
import { PullquoteContentBlockSchema } from '../../blocks/pullquote/schema';
import { MediaTextContentBlockSchema } from '../../blocks/media-text/schema';
import { GalleryContentBlockSchema } from '../../blocks/gallery/schema';
import { ButtonContentBlockSchema } from '../../blocks/button/schema';
import { CodeContentBlockSchema } from '../../blocks/code/schema';

export const ContentBlocksSchema = z.discriminatedUnion('type', [
  ParagraphContentBlockSchema,
  HeadingContentBlockSchema,
  SeparatorContentBlockSchema,
  ListContentBlockSchema,
  ImageContentBlockSchema,
  VideoContentBlockSchema,
  QuoteContentBlockSchema,
  PullquoteContentBlockSchema,
  MediaTextContentBlockSchema,
  GalleryContentBlockSchema,
  ButtonContentBlockSchema,
  CodeContentBlockSchema,
]);

export type ContentBlocks = z.infer<typeof ContentBlocksSchema>;
