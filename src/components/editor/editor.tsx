'use client';

import type { Post } from '@/schemas/post/post.schema';

import EditorProvider from './store/editor-store';
import { createNewPost } from './utils/create-new-post';
import EditorHeader from './components/header';
import EditorContent from './components/content';
import EditorBlocksSidebar from './components/sidebars/blocks';
import EditorDocumentSidebar from './components/sidebars/document';
import EditorSettingsSidebar from './components/sidebars/settings';
import EditorMedia from './components/media';

interface EditorProps {
  type: 'post' | 'page';
  action: 'create' | 'edit';
  post?: Post;
}

export default function Editor({ type, action, post }: EditorProps) {
  const initialContent =
    type === 'post' && action === 'create'
      ? createNewPost()
      : type === 'post' && action === 'edit'
        ? (post as Post)
        : null;

  return (
    <EditorProvider initialContent={initialContent}>
      <div className="flex h-full flex-col overflow-hidden">
        <EditorHeader type={type} action={action} />
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <EditorBlocksSidebar />
          <EditorDocumentSidebar />
          <EditorContent />
          <EditorSettingsSidebar type={type} />
        </div>
      </div>
      <EditorMedia />
    </EditorProvider>
  );
}
