import { useState, useEffect } from 'react';
import type { ChangeEventHandler, MouseEventHandler } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../store/editor-store';
import { EditorContentSchema } from '../../schemas/content/content.schema';

type CodeErrors = {
  id: number;
  path: string;
  message: string;
};

type SuccessToast = {
  type: 'success';
  description: string;
  action: () => void;
};

type ErrorToast = {
  type: 'error';
  description?: string;
  errors?: CodeErrors[];
};

type ToastType = SuccessToast | ErrorToast;

export default function useEditorContentCode() {
  const { contentBlocks, updateEditorContentCodeBlocks, setSelectedContentBlock } = useEditorStore(
    useShallow((state) => ({
      contentBlocks: state.editorContent?.content,
      updateEditorContentCodeBlocks: state.updateEditorContentCodeBlocks,
      setSelectedContentBlock: state.setSelectedContentBlock,
    })),
  );

  const [codeEditorContent, setCodeEditorContent] = useState(JSON.stringify(contentBlocks, null, 3));
  const [codeEditorContentUpdated, setCodeEditorContentUpdated] = useState(false);
  const [codeEditorContentToast, setCodeEditorContentToast] = useState<ToastType | null>(null);

  useEffect(() => {
    setCodeEditorContent(JSON.stringify(contentBlocks, null, 3));
  }, [contentBlocks]);

  useEffect(() => {
    if (!codeEditorContent || !codeEditorContentUpdated) return;

    const debounceTimeout = setTimeout(() => {
      try {
        const parsedJSON = JSON.parse(codeEditorContent);
        const parsedSchema = EditorContentSchema.safeParse(parsedJSON);

        if (parsedSchema.success) {
          setCodeEditorContentToast({
            type: 'success',
            description: 'Click update to apply changes',
            action: () => updateEditorContentCodeBlocks(parsedSchema.data),
          });

          setCodeEditorContentUpdated(false);
        } else {
          const codeErrors: CodeErrors[] = parsedSchema.error.issues.map((error, index) => {
            const pathLength = error.path.length;

            return { id: index, path: error.path[pathLength - 1] as string, message: error.message };
          });

          setCodeEditorContentToast({ type: 'error', errors: codeErrors });
        }
      } catch (error) {
        if (error instanceof Error) {
          setCodeEditorContentToast({ type: 'error', description: error.message });
        }
      }
    }, 1500);

    return () => clearTimeout(debounceTimeout);
  }, [codeEditorContent, codeEditorContentUpdated, updateEditorContentCodeBlocks, setCodeEditorContentUpdated]);

  const handleCodeEditorContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.target.value;

    if (!value) return;

    setCodeEditorContent(value);
    setCodeEditorContentUpdated(true);
  };

  const handleCodeEditorContentBlockClick: MouseEventHandler<HTMLTextAreaElement> = (e) => {
    const textarea = e.currentTarget;

    if (!textarea) return null;

    const lines = textarea.value.split('\n');
    const pos = textarea.selectionStart;

    let line = 0;
    let chars = 0;

    while (line < lines.length) {
      chars += lines[line].length + 1;
      if (chars > pos) break;
      line++;
    }

    let clickedBlockId = '';

    for (let i = line; i >= 0; i--) {
      const trimmed = lines[i].trim();

      const idMatch = trimmed.match(/^"id"\s*:\s*"([^"]+)"/);
      if (idMatch) clickedBlockId = idMatch[1];

      if (trimmed === '{') break;
    }

    if (!clickedBlockId) return null;

    setSelectedContentBlock(clickedBlockId);
  };

  return {
    codeEditorContent,
    codeEditorContentUpdated,
    codeEditorContentToast,
    setCodeEditorContentUpdated,
    handleCodeEditorContentChange,
    handleCodeEditorContentBlockClick,
  };
}
