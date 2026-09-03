import { useEffect } from 'react';
import { toast } from 'sonner';

import { Textarea } from '@/components/ui/textarea';

import useEditorContentCode from '../../../hooks/content/use-code';

export default function EditorContentCode() {
  const {
    codeEditorContent,
    codeEditorContentToast,
    handleCodeEditorContentChange,
    handleCodeEditorContentBlockClick,
  } = useEditorContentCode();

  useEffect(() => {
    if (!codeEditorContentToast) return;

    if (codeEditorContentToast.type === 'success') {
      toast.success('Blocks validated', {
        description: codeEditorContentToast.description,
        action: {
          label: 'Update',
          onClick: codeEditorContentToast.action,
        },
      });
    }

    if (codeEditorContentToast.type === 'error') {
      if (codeEditorContentToast.errors) {
        toast.error('Incorrect formatting', {
          description: (
            <ul className="mt-1 flex flex-col gap-y-1">
              {codeEditorContentToast.errors.map((error) => (
                <li key={error.id} className="flex flex-col">
                  <span className="font-medium capitalize">{error.path}</span>
                  <span>{error.message}</span>
                </li>
              ))}
            </ul>
          ),
        });
      } else {
        toast.error('Incorrect editor formatting', {
          description: codeEditorContentToast.description,
        });
      }
    }
  }, [codeEditorContentToast]);

  if (!codeEditorContent || codeEditorContent.length === 0) return null;

  return (
    <div id="editor-content-code" className="mx-auto w-full 2xl:max-w-screen-xl">
      <code>
        <Textarea
          id="editor-content-code-textarea"
          value={codeEditorContent}
          onChange={handleCodeEditorContentChange}
          onClick={handleCodeEditorContentBlockClick}
          data-editor-content-code-textarea
        />
      </code>
    </div>
  );
}
