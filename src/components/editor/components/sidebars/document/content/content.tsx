import { useEditorStore } from '../../../../store/editor-store';
import EditorDocumentSidebarContentItems from './items';
import EditorDocumentSidebarContentError from './error';

export default function EditorDocumentSidebarContent() {
  const contentBlocks = useEditorStore((state) => state.editorContent?.content);

  return (
    <div className="flex-1 overflow-y-auto p-5">
      {contentBlocks && contentBlocks.length > 0 ? (
        <EditorDocumentSidebarContentItems contentBlocks={contentBlocks} />
      ) : (
        <EditorDocumentSidebarContentError />
      )}
    </div>
  );
}
