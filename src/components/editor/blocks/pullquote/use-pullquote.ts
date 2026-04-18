import { useEffect, useRef } from 'react';
import type { KeyboardEventHandler } from 'react';

import type { PullquoteContentBlock } from './schema';

export default function usePullquoteBlock({ attributes }: Pick<PullquoteContentBlock, 'attributes'>) {
  const pullquoteContentRef = useRef<HTMLParagraphElement>(null);
  const pullquoteCiteRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!pullquoteContentRef.current) return;

    if (pullquoteContentRef.current.innerHTML !== attributes?.content?.value) {
      pullquoteContentRef.current.innerHTML = attributes?.content?.value ?? '';
    }
  }, [attributes?.content]);

  useEffect(() => {
    if (!pullquoteCiteRef.current) return;

    if (pullquoteCiteRef.current.innerHTML !== attributes?.cite?.value) {
      pullquoteCiteRef.current.innerHTML = attributes?.cite?.value ?? '';
    }
  }, [attributes?.cite]);

  const handlePullquoteContentOnEnter: KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key.toLocaleLowerCase() === 'enter') {
      if (!pullquoteCiteRef.current) return;

      e.preventDefault();

      pullquoteCiteRef.current.focus();
    }
  };

  const handlePullquoteCiteOnBackspace: KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key.toLocaleLowerCase() === 'backspace') {
      if (!pullquoteContentRef.current || !pullquoteCiteRef.current) return;

      const content = pullquoteCiteRef.current.textContent.trim() ?? '';

      if (content.length === 0) pullquoteContentRef.current.focus();
    }
  };

  return {
    pullquoteContentRef,
    pullquoteCiteRef,
    handlePullquoteContentOnEnter,
    handlePullquoteCiteOnBackspace,
  };
}
