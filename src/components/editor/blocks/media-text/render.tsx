import type { CSSProperties } from 'react';

import useBlocks from '../use-blocks';
import useBlocksRichText from '../use-blocks-rich-text';
import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { MediaTextContentBlock } from './schema';
import useMediaTextBlock from './use-media-text';
import mediaTextBlockStyles from './style.module.css';
import MediaTextBlockRenderButtons from './buttons';
import MediaTextBlockRenderEmpty from './empty';

export default function MediaTextBlockRender({ id, type, attributes }: MediaTextContentBlock) {
  const { handleSelectedContentBlock, handleBlockContentInput, handleBlockContentPaste, handleBlockContentUpdate } =
    useBlocks();

  const { handleContentBlockRichTextSelect } = useBlocksRichText();

  const { editMediaTextBlockURL, removeMediaTextBlockURL, mediaTextContentRef, handleMediaTextContentOnEnter } =
    useMediaTextBlock({
      id,
      attributes,
    });

  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const mediaType = attributes?.mediaType?.value;
  const mediaUrl = attributes?.mediaUrl?.value;
  const mediaAltText = attributes?.mediaAltText?.value;
  const mediaPosition = attributes?.mediaPosition?.value ?? 'left';
  const mediaWidth = attributes?.mediaWidth?.value ?? 50;
  const mediaSize = attributes?.mediaSize?.value ?? 'original';
  const mediaAspect = attributes?.mediaAspect?.value ?? 'original';
  const textPosition = attributes?.textPosition?.value ?? 'center';

  const mediaTextBlockClass = mediaTextBlockStyles['block-media-text'];
  const mediaTextBlockMediaClass = mediaTextBlockStyles['block-media-text-media'];
  const mediaTextBlockMediaWrapperClass = mediaTextBlockStyles['block-media-text-media-wrapper'];
  const mediaTextBlockContentClass = mediaTextBlockStyles['block-media-text-content'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + mediaTextBlockClass;

  return (
    <div
      {...blockAnchor}
      className={`block-media-text ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      data-block-media-position={mediaPosition}
      data-block-media-width={mediaWidth}
      data-block-media-size={mediaSize}
      data-block-media-aspect={mediaAspect}
      data-block-text-position={textPosition}
      onClick={() => handleSelectedContentBlock(id)}
      style={{ '--media-width': `${mediaWidth}%` } as CSSProperties}
    >
      <div className={mediaTextBlockMediaClass}>
        {mediaType && mediaUrl ? (
          <>
            {mediaType === 'image' ? (
              <figure>
                <div className={mediaTextBlockMediaWrapperClass}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mediaUrl} alt={mediaAltText ?? ''} />
                  <MediaTextBlockRenderButtons
                    media={mediaType}
                    editMediaTextBlockURL={editMediaTextBlockURL}
                    removeMediaTextBlockURL={removeMediaTextBlockURL}
                  />
                </div>
              </figure>
            ) : (
              <div className={mediaTextBlockMediaWrapperClass}>
                <video controls={true} onClick={(e) => e.preventDefault()}>
                  <source src={mediaUrl} type="video/mp4" />
                </video>
                <MediaTextBlockRenderButtons
                  media={mediaType}
                  editMediaTextBlockURL={editMediaTextBlockURL}
                  removeMediaTextBlockURL={removeMediaTextBlockURL}
                />
              </div>
            )}
          </>
        ) : (
          <MediaTextBlockRenderEmpty editMediaTextBlockURL={editMediaTextBlockURL} />
        )}
      </div>
      <div className={mediaTextBlockContentClass}>
        <p
          ref={mediaTextContentRef}
          data-block-attribute-key="text"
          data-block-placeholder="Type to add content..."
          data-block-content-type="rich-text"
          contentEditable={true}
          onInput={(e) =>
            handleBlockContentInput({ e, blockContentRef: mediaTextContentRef, blockContentType: 'rich-text' })
          }
          onMouseUp={handleContentBlockRichTextSelect}
          onPaste={(e) => handleBlockContentPaste({ e, blockContentRef: mediaTextContentRef })}
          onKeyDown={handleMediaTextContentOnEnter}
          onBlur={() =>
            handleBlockContentUpdate({
              blockId: id,
              blockType: type,
              blockAttribute: 'text',
              blockAttributeValue: attributes?.text?.value,
              blockContentRef: mediaTextContentRef,
              blockContentType: 'rich-text',
            })
          }
        />
      </div>
    </div>
  );
}
