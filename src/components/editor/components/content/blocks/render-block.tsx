import { useSortable } from '@dnd-kit/react/sortable';

import type { ContentBlocks } from '../../../schemas/content/content-blocks.schema';
import { blockRegistry } from '../../../blocks/blocks';
import EditorContentBlocksRenderBlockWrapper from './block-wrapper';
import { EditorContentBlocksRenderBlockError } from './block-error';

export default function EditorContentBlocksRenderBlock({ block, index }: { block: ContentBlocks; index: number }) {
  const { ref: blockDragRef, handleRef: blockDragHandleRef } = useSortable({
    id: block.id,
    index,
  });

  switch (block.type) {
    case 'paragraph': {
      const BlockTemplate = blockRegistry.paragraph.render;

      return (
        <EditorContentBlocksRenderBlockWrapper
          id={block.id}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
          width={block.attributes?.width?.value}
        >
          <EditorContentBlocksRenderBlockError block={block}>
            <BlockTemplate {...block} />
          </EditorContentBlocksRenderBlockError>
        </EditorContentBlocksRenderBlockWrapper>
      );
    }

    case 'heading': {
      const BlockTemplate = blockRegistry.heading.render;

      return (
        <EditorContentBlocksRenderBlockWrapper
          id={block.id}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
          width={block.attributes?.width?.value}
        >
          <EditorContentBlocksRenderBlockError block={block}>
            <BlockTemplate {...block} />
          </EditorContentBlocksRenderBlockError>
        </EditorContentBlocksRenderBlockWrapper>
      );
    }

    case 'separator': {
      const BlockTemplate = blockRegistry.separator.render;

      return (
        <EditorContentBlocksRenderBlockWrapper
          id={block.id}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
          width={block.attributes?.width?.value}
        >
          <EditorContentBlocksRenderBlockError block={block}>
            <BlockTemplate {...block} />
          </EditorContentBlocksRenderBlockError>
        </EditorContentBlocksRenderBlockWrapper>
      );
    }

    case 'list': {
      const BlockTemplate = blockRegistry.list.render;

      return (
        <EditorContentBlocksRenderBlockWrapper
          id={block.id}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
          width={block.attributes?.width?.value}
        >
          <EditorContentBlocksRenderBlockError block={block}>
            <BlockTemplate {...block} />
          </EditorContentBlocksRenderBlockError>
        </EditorContentBlocksRenderBlockWrapper>
      );
    }

    case 'image': {
      const BlockTemplate = blockRegistry.image.render;

      return (
        <EditorContentBlocksRenderBlockWrapper
          id={block.id}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
          width={block.attributes?.width?.value}
        >
          <EditorContentBlocksRenderBlockError block={block}>
            <BlockTemplate {...block} />
          </EditorContentBlocksRenderBlockError>
        </EditorContentBlocksRenderBlockWrapper>
      );
    }

    case 'video': {
      const BlockTemplate = blockRegistry.video.render;

      return (
        <EditorContentBlocksRenderBlockWrapper
          id={block.id}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
          width={block.attributes?.width?.value}
        >
          <EditorContentBlocksRenderBlockError block={block}>
            <BlockTemplate {...block} />
          </EditorContentBlocksRenderBlockError>
        </EditorContentBlocksRenderBlockWrapper>
      );
    }

    case 'quote': {
      const BlockTemplate = blockRegistry.quote.render;

      return (
        <EditorContentBlocksRenderBlockWrapper
          id={block.id}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
          width={block.attributes?.width?.value}
        >
          <EditorContentBlocksRenderBlockError block={block}>
            <BlockTemplate {...block} />
          </EditorContentBlocksRenderBlockError>
        </EditorContentBlocksRenderBlockWrapper>
      );
    }

    case 'pullquote': {
      const BlockTemplate = blockRegistry.pullquote.render;

      return (
        <EditorContentBlocksRenderBlockWrapper
          id={block.id}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
          width={block.attributes?.width?.value}
        >
          <EditorContentBlocksRenderBlockError block={block}>
            <BlockTemplate {...block} />
          </EditorContentBlocksRenderBlockError>
        </EditorContentBlocksRenderBlockWrapper>
      );
    }

    case 'mediaText': {
      const BlockTemplate = blockRegistry.mediaText.render;

      return (
        <EditorContentBlocksRenderBlockWrapper
          id={block.id}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
          width={block.attributes?.width?.value}
        >
          <EditorContentBlocksRenderBlockError block={block}>
            <BlockTemplate {...block} />
          </EditorContentBlocksRenderBlockError>
        </EditorContentBlocksRenderBlockWrapper>
      );
    }

    case 'gallery': {
      const BlockTemplate = blockRegistry.gallery.render;

      return (
        <EditorContentBlocksRenderBlockWrapper
          id={block.id}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
          width={block.attributes?.width?.value}
        >
          <EditorContentBlocksRenderBlockError block={block}>
            <BlockTemplate {...block} />
          </EditorContentBlocksRenderBlockError>
        </EditorContentBlocksRenderBlockWrapper>
      );
    }

    case 'button': {
      const BlockTemplate = blockRegistry.button.render;

      return (
        <EditorContentBlocksRenderBlockWrapper
          id={block.id}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
          width={block.attributes?.width?.value}
        >
          <EditorContentBlocksRenderBlockError block={block}>
            <BlockTemplate {...block} />
          </EditorContentBlocksRenderBlockError>
        </EditorContentBlocksRenderBlockWrapper>
      );
    }

    case 'code': {
      const BlockTemplate = blockRegistry.code.render;

      return (
        <EditorContentBlocksRenderBlockWrapper
          id={block.id}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
          width={block.attributes?.width?.value}
        >
          <EditorContentBlocksRenderBlockError block={block}>
            <BlockTemplate {...block} />
          </EditorContentBlocksRenderBlockError>
        </EditorContentBlocksRenderBlockWrapper>
      );
    }

    default:
      return null;
  }
}
