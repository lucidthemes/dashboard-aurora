import { Pencil, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import useBlocks from '../use-blocks';
import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { VideoContentBlock } from './schema';
import useVideoBlock from './use-video';
import videoBlockStyles from './style.module.css';
import VideoBlockRenderEmpty from './empty';

export default function VideoBlockRender({ id, type, attributes }: VideoContentBlock) {
  const { handleSelectedContentBlock } = useBlocks();

  const { editVideoBlockURL, removeVideoBlockURL } = useVideoBlock({ id });

  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const url = attributes?.url?.value;
  const size = attributes?.size?.value ?? 'original';
  const aspect = attributes?.aspect?.value ?? 'original';

  const videoBlockClass = videoBlockStyles['block-video'];
  const videoBlockWrapperClass = videoBlockStyles['block-video-wrapper'];
  const videoBlockWrapperButtonsClass = videoBlockStyles['block-video-wrapper-buttons'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + videoBlockClass;

  return (
    <div
      {...blockAnchor}
      className={`block-video ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      data-block-size={size}
      data-block-aspect={aspect}
      onClick={() => handleSelectedContentBlock(id)}
    >
      {url ? (
        <div className={videoBlockWrapperClass}>
          <video controls={true} onClick={(e) => e.preventDefault()}>
            <source src={url} type="video/mp4" />
          </video>
          <div className={videoBlockWrapperButtonsClass}>
            <Button variant="ghost" size="icon-sm" onClick={editVideoBlockURL}>
              <Pencil />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={removeVideoBlockURL}>
              <X />
            </Button>
          </div>
        </div>
      ) : (
        <VideoBlockRenderEmpty editVideoBlockURL={editVideoBlockURL} />
      )}
    </div>
  );
}
