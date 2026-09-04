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

import { createPage } from '../../actions/page/create-page.action';
import { updatePage } from '../../actions/page/update-page.action';
import { EditorCreatePageSchema } from '../../schemas/actions/page/create-page.schema';
import { EditorUpdatePageSchema } from '../../schemas/actions/page/update-page.schema';
import type { EditorCreatePage } from '../../schemas/actions/page/create-page.schema';
import type { EditorUpdatePage } from '../../schemas/actions/page/update-page.schema';

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
          const parsed =
            type === 'post' && action === 'create'
              ? EditorCreatePostSchema.safeParse(editorContent)
              : type === 'post' && action === 'edit'
                ? EditorUpdatePostSchema.safeParse(editorContent)
                : type === 'page' && action === 'create'
                  ? EditorCreatePageSchema.safeParse(editorContent)
                  : type === 'page' && action === 'edit'
                    ? EditorUpdatePageSchema.safeParse(editorContent)
                    : null;

          if (!parsed) return;

          if (parsed.success) {
            if (action === 'create') {
              const result =
                type === 'post'
                  ? await createPost({ editorData: parsed.data as EditorCreatePost })
                  : type === 'page'
                    ? await createPage({ editorData: parsed.data as EditorCreatePage })
                    : null;

              if (!result) {
                toast.error(`Error publishing ${type}`);
                return;
              }

              if (result && result.success) {
                toast.success(`Successfully published ${type}`);

                resetEditorContentUnsavedChanges();
              } else {
                if (result.errors) {
                  toast.error(`Error publishing ${type}`, {
                    description: (
                      <ul>
                        {result.errors.map((error) => (
                          <li key={error}>{error}</li>
                        ))}
                      </ul>
                    ),
                  });
                } else {
                  toast.error(`Error publishing ${type}`);
                }
              }
            } else {
              const result =
                type === 'post'
                  ? await updatePost({ editorData: parsed.data as EditorUpdatePost })
                  : type === 'page'
                    ? await updatePage({ editorData: parsed.data as EditorUpdatePage })
                    : null;

              if (!result) {
                toast.error(`Error saving ${type}`);
                return;
              }

              if (result.success) {
                toast.success(`Successfully saved ${type}`);

                resetEditorContentUnsavedChanges();
              } else {
                if (result.errors) {
                  toast.error(`Error saving ${type}`, {
                    description: (
                      <ul>
                        {result.errors.map((error) => (
                          <li key={error}>Error: {error}</li>
                        ))}
                      </ul>
                    ),
                  });
                } else {
                  toast.error(`Error saving ${type}`);
                }
              }
            }
          } else {
            const editorErrors = parsed.error.issues.map((error) => {
              return { path: error.path[0] as string, code: error.code, message: error.message };
            });

            if (action === 'create') {
              toast.error(`Error publishing ${type}`);
            } else {
              toast.error(`Error saving ${type}`);
            }

            setEditorContentErrors(editorErrors);
          }
        });
      }}
    >
      {isPending && <Spinner data-icon="inline-start" />}
      {buttonText}
    </Button>
  );
}
