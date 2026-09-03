'use client';

import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../store/editor-store';
import EditorContentTitle from './title';
import EditorContentBlocks from './blocks';
import EditorContentCode from './code';
import EditorToolbar from './toolbar';

export default function EditorContent() {
  const { editorContentUnsavedChanges, resetSelectedContentBlock, editorContentBlocksStyle } = useEditorStore(
    useShallow((state) => ({
      editorContentUnsavedChanges: state.editorContentUnsavedChanges,
      resetSelectedContentBlock: state.resetSelectedContentBlock,
      editorContentBlocksStyle: state.editorContentBlocksStyle,
    })),
  );

  useEffect(() => {
    if (!editorContentUnsavedChanges) return;

    // prevent back button if unsaved changes
    const handlePopState = () => {
      const confirmed = window.confirm('Changes that you made may not be saved.');

      if (confirmed) {
        history.back();
      } else {
        history.pushState(null, '', window.location.href);
      }
    };

    history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    // prevent reload if unsaved changes
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [editorContentUnsavedChanges]);

  useEffect(() => {
    // reset selected block when click happens outside of a block
    // used to close editor toolbar
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) return;

      if (
        target.closest('[data-block-id]') ||
        target.closest('[data-editor-toolbar]') ||
        target.closest('[data-radix-popper-content-wrapper]') ||
        target.closest('[data-editor-sidebar-document-item]') ||
        target.closest('[data-editor-sidebar-settings-block-tab]') ||
        target.closest('[data-editor-content-code-textarea]')
      ) {
        return;
      }

      resetSelectedContentBlock();
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [resetSelectedContentBlock]);

  return (
    <>
      <div className="relative flex flex-1 justify-center">
        <div className="absolute inset-0 flex w-full flex-col gap-y-10 transition-all duration-300">
          <div className="flex flex-1 flex-col gap-y-10 overflow-y-auto">
            <div className="flex flex-col gap-y-10 p-2.5">
              <EditorContentTitle />
              {editorContentBlocksStyle === 'block' ? <EditorContentBlocks /> : <EditorContentCode />}
            </div>
          </div>
        </div>
      </div>
      <EditorToolbar />
    </>
  );
}
