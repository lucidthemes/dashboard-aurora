import { useRef, useEffect } from 'react';

import type { CodeContentBlock } from './schema';

export default function useCodeBlock({ attributes }: Pick<CodeContentBlock, 'attributes'>) {
  const codeContentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!codeContentRef.current) return;

    if (codeContentRef.current.textContent !== attributes?.content?.value) {
      codeContentRef.current.textContent = attributes?.content?.value ?? '';
    }
  }, [attributes?.content]);

  return { codeContentRef };
}
