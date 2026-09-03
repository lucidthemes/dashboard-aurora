import { useRef, useEffect } from 'react';
import type { KeyboardEventHandler } from 'react';

import type { ButtonContentBlock } from './schema';

export default function useButtonBlock({ attributes }: Pick<ButtonContentBlock, 'attributes'>) {
  const buttonTextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonTextRef.current) return;

    if (buttonTextRef.current.textContent !== attributes?.text?.value) {
      buttonTextRef.current.textContent = attributes?.text?.value ?? '';
    }
  }, [attributes?.text]);

  const handleButtonOnEnter: KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key.toLocaleLowerCase() === 'enter') {
      e.preventDefault();
    }
  };

  return { buttonTextRef, handleButtonOnEnter };
}
