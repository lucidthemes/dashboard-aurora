import { useTransition } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import { createPost } from '../../actions/post/create-post.action';
import { updatePost } from '../../actions/post/update-post.action';
import { EditorCreatePostSchema } from '../../schemas/actions/post/create-post.schema';
import { EditorUpdatePostSchema } from '../../schemas/actions/post/update-post.schema';
import type { EditorCreatePost } from '../../schemas/actions/post/create-post.schema';
import type { EditorUpdatePost } from '../../schemas/actions/post/update-post.schema';

import { useEditorStore } from '../../store/editor-store';

export default function EditorHeaderButtonPublish({
  type,
  action,
}: {
  type: 'post' | 'page';
  action: 'create' | 'edit';
}) {
  const [isPending, startTransition] = useTransition();

  const { editorContent, editorContentUnsavedChanges, resetEditorContentUnsavedChanges, setEditorContentErrors } =
    useEditorStore(
      useShallow((state) => ({
        editorContent: state.editorContent,
        editorContentUnsavedChanges: state.editorContentUnsavedChanges,
        resetEditorContentUnsavedChanges: state.resetEditorContentUnsavedChanges,
        setEditorContentErrors: state.setEditorContentErrors,
      })),
    );

  const buttonDisabled = editorContentUnsavedChanges ? false : true;

  const buttonText = action === 'create' ? 'publish' : 'save';

  return (
    <Button
      className="cursor-pointer capitalize"
      disabled={isPending || buttonDisabled}
      onClick={() => {
        startTransition(async () => {
          if (type === 'post') {
            const parsed =
              action === 'create'
                ? EditorCreatePostSchema.safeParse(editorContent)
                : EditorUpdatePostSchema.safeParse(editorContent);

            if (parsed.success) {
              if (action === 'create') {
                const result = await createPost({ editorData: parsed.data as EditorCreatePost });

                if (result.success) {
                  toast.success('Successfully published post');

                  resetEditorContentUnsavedChanges();
                } else {
                  if (result.errors) {
                    toast.error('Error publishing post', {
                      description: (
                        <ul>
                          {result.errors.map((error) => (
                            <li key={error}>{error}</li>
                          ))}
                        </ul>
                      ),
                    });
                  } else {
                    toast.error('Error publishing post');
                  }
                }
              } else {
                const result = await updatePost({ editorData: parsed.data as EditorUpdatePost });

                if (result.success) {
                  toast.success('Successfully saved post');

                  resetEditorContentUnsavedChanges();
                } else {
                  if (result.errors) {
                    toast.error('Error saving post', {
                      description: (
                        <ul>
                          {result.errors.map((error) => (
                            <li key={error}>Error: {error}</li>
                          ))}
                        </ul>
                      ),
                    });
                  } else {
                    toast.error('Error saving post');
                  }
                }
              }
            } else {
              const editorErrors = parsed.error.issues.map((error) => {
                return { path: error.path[0] as string, code: error.code, message: error.message };
              });

              if (action === 'create') {
                toast.error('Error publishing post');
              } else {
                toast.error('Error saving post');
              }

              setEditorContentErrors(editorErrors);
            }
          } else if (type === 'page') {
            // page create
          }
        });
      }}
    >
      {isPending && <Spinner data-icon="inline-start" />}
      {buttonText}
    </Button>
  );
}
