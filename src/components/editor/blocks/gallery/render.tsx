import { Pencil, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorStore } from '../../store/editor-store';
import useBlocks from '../use-blocks';
import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { GalleryContentBlock } from './schema';
import useGalleryBlock from './use-gallery';
import galleryBlockStyles from './style.module.css';
import GalleryBlockRenderEmpty from './empty';

export default function ImageBlockRender({ id, type, attributes }: GalleryContentBlock) {
  const { handleSelectedContentBlock } = useBlocks();

  const { editGalleryBlockImages } = useGalleryBlock({ id });

  const removeGalleryBlockImage = useEditorStore((state) => state.removeGalleryBlockImage);

  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const images = attributes?.images?.items;
  const columns = attributes?.columns?.value;

  const blockColumns =
    images && columns && images.length >= columns
      ? columns
      : images && columns && images.length <= columns
        ? images.length
        : 2;

  const galleryBlockClass = galleryBlockStyles['block-gallery'];
  const galleryBlockGridClass = galleryBlockStyles['block-gallery-grid'];
  const galleryBlockGridItemClass = galleryBlockStyles['block-gallery-grid-item'];
  const galleryBlockGridItemButtonsClass = galleryBlockStyles['block-gallery-grid-item-buttons'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + galleryBlockClass;

  return (
    <div
      {...blockAnchor}
      className={`block-gallery ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-columns={blockColumns}
      onClick={() => handleSelectedContentBlock(id)}
    >
      {images && images.length > 0 ? (
        <div className={galleryBlockGridClass}>
          {images.map((image) => (
            <figure key={image.id.value} className={galleryBlockGridItemClass}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.url.value} alt={image.altText?.value ?? ''} />
              <div className={galleryBlockGridItemButtonsClass}>
                <Button variant="ghost" size="icon-sm" onClick={editGalleryBlockImages}>
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeGalleryBlockImage({ blockId: id, url: image.url.value ?? '' })}
                >
                  <X />
                </Button>
              </div>
            </figure>
          ))}
        </div>
      ) : (
        <GalleryBlockRenderEmpty editGalleryBlockImages={editGalleryBlockImages} />
      )}
    </div>
  );
}
