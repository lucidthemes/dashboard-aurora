import useEditorContentTitle from '../../hooks/content/use-title';
import useBlocks from '../../blocks/use-blocks';

export default function EditorContentTitle() {
  const { contentTitleRef, contentTitleErrors, handleContentTitleInput, handleContentTitleUpdate } =
    useEditorContentTitle();

  const { handleNewParagraphBlockOnEnter } = useBlocks();

  const contentTitleErrorClass = contentTitleErrors && contentTitleErrors.length > 0 ? 'text-destructive' : '';

  return (
    <h1
      ref={contentTitleRef}
      id="editor-title"
      className={`mx-auto mt-10 cursor-text text-4xl font-medium empty:after:opacity-50 empty:after:content-[attr(data-title-placeholder)] focus-visible:outline-0 2xl:max-w-screen-xl ${contentTitleErrorClass}`}
      aria-label="Add title"
      data-title-placeholder="Add title"
      contentEditable="plaintext-only"
      onInput={handleContentTitleInput}
      onBlur={handleContentTitleUpdate}
      onKeyDown={(e) => handleNewParagraphBlockOnEnter({ e, blockRef: contentTitleRef, type: 'title' })}
    />
  );
}
