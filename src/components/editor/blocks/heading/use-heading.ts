import { useEffect, useRef } from 'react';

import type { HeadingContentBlock } from './schema';

export default function useHeadingBlock({ attributes }: Pick<HeadingContentBlock, 'attributes'>) {
  const headingContentRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingContentRef.current) return;

    if (headingContentRef.current.innerHTML !== attributes?.content?.value) {
      headingContentRef.current.innerHTML = attributes?.content?.value ?? '';
    }
  }, [attributes?.content, attributes?.level]);

  return { headingContentRef };
}
