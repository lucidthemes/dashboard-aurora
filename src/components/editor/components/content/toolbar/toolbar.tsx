'use client';

import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useFloating, offset, shift, hide, autoUpdate } from '@floating-ui/react';

import { useEditorStore } from '../../../store/editor-store';
import EditorToolbarContent from './content';

export default function EditorToolbar() {
  const { selectedContentBlock, editorContentBlocksStyle } = useEditorStore(
    useShallow((state) => ({
      selectedContentBlock: state.selectedContentBlock,
      editorContentBlocksStyle: state.editorContentBlocksStyle,
    })),
  );

  const { refs, floatingStyles, middlewareData } = useFloating({
    placement: 'top-start',
    middleware: [offset({ mainAxis: 8, crossAxis: 40 }), shift(), hide({ strategy: 'escaped' })],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    if (!selectedContentBlock || editorContentBlocksStyle === 'code') {
      refs.setReference(null);
      return;
    }

    const blockElement = document.querySelector<HTMLElement>(`.editor-block[data-block-id="${selectedContentBlock}"]`);

    refs.setReference(blockElement);
  }, [selectedContentBlock, editorContentBlocksStyle, refs]);

  if (!refs.reference.current) return;

  const { setFloating } = refs;

  return (
    <div
      ref={setFloating}
      style={{
        ...floatingStyles,
        visibility: middlewareData.hide?.escaped ? 'hidden' : 'visible',
      }}
      data-editor-toolbar
    >
      <EditorToolbarContent />
    </div>
  );
}
