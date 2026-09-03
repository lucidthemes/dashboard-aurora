import dynamic from 'next/dynamic';

import type { BlockRegistry } from './block.schema';

import paragraphMeta from '../blocks/paragraph/block.json';
import type { ParagraphEditorBlock } from './paragraph/schema';
import { ParagraphBlockCreate } from './paragraph/create';

import headingMeta from '../blocks/heading/block.json';
import type { HeadingEditorBlock } from './heading/schema';
import { HeadingBlockCreate } from './heading/create';

import separatorMeta from '../blocks/separator/block.json';
import type { SeparatorEditorBlock } from './separator/schema';
import { SeparatorBlockCreate } from './separator/create';

import listMeta from '../blocks/list/block.json';
import type { ListEditorBlock } from './list/schema';
import { ListBlockCreate, ListBlockCreateItem } from './list/create';

import imageMeta from '../blocks/image/block.json';
import type { ImageEditorBlock } from './image/schema';
import { ImageBlockCreate } from './image/create';

import videoMeta from '../blocks/video/block.json';
import type { VideoEditorBlock } from './video/schema';
import { VideoBlockCreate } from './video/create';

import quoteMeta from '../blocks/quote/block.json';
import type { QuoteEditorBlock } from './quote/schema';
import { QuoteBlockCreate } from './quote/create';

import pullquoteMeta from '../blocks/pullquote/block.json';
import type { PullquoteEditorBlock } from './pullquote/schema';
import { PullquoteBlockCreate } from './pullquote/create';

import mediaTextMeta from '../blocks/media-text/block.json';
import type { MediaTextEditorBlock } from './media-text/schema';
import { MediaTextBlockCreate } from './media-text/create';

import galleryMeta from '../blocks/gallery/block.json';
import type { GalleryEditorBlock } from './gallery/schema';
import { GalleryBlockCreate, GalleryBlockCreateItem } from './gallery/create';

import buttonMeta from '../blocks/button/block.json';
import type { ButtonEditorBlock } from './button/schema';
import { ButtonBlockCreate } from './button/create';

import codeMeta from '../blocks/code/block.json';
import type { CodeEditorBlock } from './code/schema';
import { CodeBlockCreate } from './code/create';

export const blockRegistry: BlockRegistry = {
  paragraph: {
    meta: paragraphMeta as ParagraphEditorBlock,
    render: dynamic(() => import('../blocks/paragraph/render'), {
      ssr: false,
    }),
    create: ParagraphBlockCreate,
  },
  heading: {
    meta: headingMeta as HeadingEditorBlock,
    render: dynamic(() => import('../blocks/heading/render'), {
      ssr: false,
    }),
    create: HeadingBlockCreate,
  },
  separator: {
    meta: separatorMeta as SeparatorEditorBlock,
    render: dynamic(() => import('../blocks/separator/render'), {
      ssr: false,
    }),
    create: SeparatorBlockCreate,
  },
  list: {
    meta: listMeta as ListEditorBlock,
    render: dynamic(() => import('../blocks/list/render'), {
      ssr: false,
    }),
    create: ListBlockCreate,
    createItem: ListBlockCreateItem,
  },
  image: {
    meta: imageMeta as ImageEditorBlock,
    render: dynamic(() => import('../blocks/image/render'), {
      ssr: false,
    }),
    create: ImageBlockCreate,
  },
  video: {
    meta: videoMeta as VideoEditorBlock,
    render: dynamic(() => import('../blocks/video/render'), {
      ssr: false,
    }),
    create: VideoBlockCreate,
  },
  quote: {
    meta: quoteMeta as QuoteEditorBlock,
    render: dynamic(() => import('../blocks/quote/render'), {
      ssr: false,
    }),
    create: QuoteBlockCreate,
  },
  pullquote: {
    meta: pullquoteMeta as PullquoteEditorBlock,
    render: dynamic(() => import('../blocks/pullquote/render'), {
      ssr: false,
    }),
    create: PullquoteBlockCreate,
  },
  mediaText: {
    meta: mediaTextMeta as MediaTextEditorBlock,
    render: dynamic(() => import('../blocks/media-text/render'), {
      ssr: false,
    }),
    create: MediaTextBlockCreate,
  },
  gallery: {
    meta: galleryMeta as GalleryEditorBlock,
    render: dynamic(() => import('../blocks/gallery/render'), {
      ssr: false,
    }),
    create: GalleryBlockCreate,
    createItem: GalleryBlockCreateItem,
  },
  button: {
    meta: buttonMeta as ButtonEditorBlock,
    render: dynamic(() => import('../blocks/button/render'), {
      ssr: false,
    }),
    create: ButtonBlockCreate,
  },
  code: {
    meta: codeMeta as CodeEditorBlock,
    render: dynamic(() => import('../blocks/code/render'), {
      ssr: false,
    }),
    create: CodeBlockCreate,
  },
};
