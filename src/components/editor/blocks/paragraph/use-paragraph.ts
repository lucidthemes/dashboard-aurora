import { useRef, useEffect } from 'react';

import { useEditorStore } from '../../store/editor-store';

import type { ParagraphContentBlock } from './schema';

export default function useParagraphBlock({ attributes }: Pick<ParagraphContentBlock, 'attributes'>) {
  const paragraphBlockOnEnterId = useEditorStore((state) => state.paragraphBlockOnEnterId);

  const paragraphContentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!paragraphContentRef.current) return;

    if (paragraphContentRef.current.innerHTML !== attributes?.content?.value) {
      paragraphContentRef.current.innerHTML = attributes?.content?.value ?? '';
    }
  }, [attributes?.content]);

  useEffect(() => {
    if (!paragraphBlockOnEnterId) return;

    const paragraphBlockElement = document.querySelector<HTMLElement>(
      `.block-paragraph[data-block-id="${paragraphBlockOnEnterId}"]`,
    );

    // change focus to paragraph block. used for when creating a new paragraph block on enter so that cursor moves to new block
    if (paragraphBlockElement) paragraphBlockElement?.focus();
  }, [paragraphBlockOnEnterId]);

  return { paragraphContentRef };
}
