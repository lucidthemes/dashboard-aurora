import { useEffect, useRef } from 'react';
import type { KeyboardEventHandler } from 'react';

import type { QuoteContentBlock } from './schema';

export default function useQuoteBlock({ attributes }: Pick<QuoteContentBlock, 'attributes'>) {
  const quoteContentRef = useRef<HTMLParagraphElement>(null);
  const quoteCiteRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!quoteContentRef.current) return;

    if (quoteContentRef.current.innerHTML !== attributes?.content?.value) {
      quoteContentRef.current.innerHTML = attributes?.content?.value ?? '';
    }
  }, [attributes?.content]);

  useEffect(() => {
    if (!quoteCiteRef.current) return;

    if (quoteCiteRef.current.innerHTML !== attributes?.cite?.value) {
      quoteCiteRef.current.innerHTML = attributes?.cite?.value ?? '';
    }
  }, [attributes?.cite]);

  const handleQuoteContentOnEnter: KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key.toLocaleLowerCase() === 'enter') {
      if (!quoteCiteRef.current) return;

      e.preventDefault();

      quoteCiteRef.current.focus();
    }
  };

  const handleQuoteCiteOnBackspace: KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key.toLocaleLowerCase() === 'backspace') {
      if (!quoteContentRef.current || !quoteCiteRef.current) return;

      const content = quoteCiteRef.current.textContent.trim() ?? '';

      if (content.length === 0) quoteContentRef.current.focus();
    }
  };

  return {
    quoteContentRef,
    quoteCiteRef,
    handleQuoteContentOnEnter,
    handleQuoteCiteOnBackspace,
  };
}
