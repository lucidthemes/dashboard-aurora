import type { ParagraphEditorBlock } from '../../blocks/paragraph/schema';
import type { HeadingEditorBlock } from '../../blocks/heading/schema';
import type { SeparatorEditorBlock } from '../../blocks/separator/schema';
import type { ListEditorBlock } from '../../blocks/list/schema';
import type { ImageEditorBlock } from '../../blocks/image/schema';
import type { VideoEditorBlock } from '../../blocks/video/schema';
import type { QuoteEditorBlock } from '../../blocks/quote/schema';
import type { PullquoteEditorBlock } from '../../blocks/pullquote/schema';
import type { MediaTextEditorBlock } from '../../blocks/media-text/schema';
import type { GalleryEditorBlock } from '../../blocks/gallery/schema';
import type { ButtonEditorBlock } from '../../blocks/button/schema';
import type { CodeEditorBlock } from '../../blocks/code/schema';

// Used for editor blocks (block list, block toolbar)
export type EditorBlocks =
  | ParagraphEditorBlock
  | HeadingEditorBlock
  | SeparatorEditorBlock
  | ListEditorBlock
  | ImageEditorBlock
  | VideoEditorBlock
  | QuoteEditorBlock
  | PullquoteEditorBlock
  | MediaTextEditorBlock
  | GalleryEditorBlock
  | ButtonEditorBlock
  | CodeEditorBlock;
