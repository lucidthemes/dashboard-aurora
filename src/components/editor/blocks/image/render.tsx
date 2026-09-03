import { Pencil, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import useBlocks from '../use-blocks';
import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { ImageContentBlock } from './schema';
import useImageBlock from './use-image';
import imageBlockStyles from './style.module.css';
import ImageBlockRenderEmpty from './empty';

export default function ImageBlockRender({ id, type, attributes }: ImageContentBlock) {
  const { handleSelectedContentBlock, handleBlockContentInput, handleBlockContentPaste, handleBlockContentUpdate } =
    useBlocks();

  const { editImageBlockURL, removeImageBlockURL, imageCaptionRef, handleImageCaptionOnEnter } = useImageBlock({
    id,
    attributes,
  });

  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const url = attributes?.url?.value;
  const altText = attributes?.altText?.value;
  const size = attributes?.size?.value ?? 'original';
  const aspect = attributes?.aspect?.value ?? 'original';

  const imageBlockClass = imageBlockStyles['block-image'];
  const imageBlockWrapperClass = imageBlockStyles['block-image-wrapper'];
  const imageBlockWrapperButtonsClass = imageBlockStyles['block-image-wrapper-buttons'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + imageBlockClass;

  return (
    <div
      {...blockAnchor}
      className={`block-image ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      data-block-size={size}
      data-block-aspect={aspect}
      onClick={() => handleSelectedContentBlock(id)}
    >
      {url ? (
        <figure>
          <div className={imageBlockWrapperClass}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={altText ?? ''} />
            <div className={imageBlockWrapperButtonsClass}>
              <Button variant="ghost" size="icon-sm" onClick={editImageBlockURL}>
                <Pencil />
              </Button>
              <Button variant="ghost" size="icon-sm" onClick={removeImageBlockURL}>
                <X />
              </Button>
            </div>
          </div>
          <figcaption
            ref={imageCaptionRef}
            data-block-attribute-key="caption"
            data-block-placeholder="Type to add caption..."
            data-block-content-type="plain-text"
            contentEditable="plaintext-only"
            onInput={(e) =>
              handleBlockContentInput({ e, blockContentRef: imageCaptionRef, blockContentType: 'plain-text' })
            }
            onPaste={(e) => handleBlockContentPaste({ e, blockContentRef: imageCaptionRef })}
            onKeyDown={handleImageCaptionOnEnter}
            onBlur={() =>
              handleBlockContentUpdate({
                blockId: id,
                blockType: type,
                blockAttribute: 'caption',
                blockAttributeValue: attributes?.caption?.value,
                blockContentRef: imageCaptionRef,
                blockContentType: 'plain-text',
              })
            }
          />
        </figure>
      ) : (
        <ImageBlockRenderEmpty editImageBlockURL={editImageBlockURL} />
      )}
    </div>
  );
}
