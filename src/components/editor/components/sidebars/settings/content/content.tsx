import EditorSettingsSidebarContentDocumentTab from './document';
import EditorSettingsSidebarContentBlockTab from './block';

export default function EditorSettingsSidebarContent({
  type,
  selectedContentBlock,
}: {
  type: 'post' | 'page';
  selectedContentBlock: string | null;
}) {
  return (
    <>
      <EditorSettingsSidebarContentDocumentTab type={type} />
      <EditorSettingsSidebarContentBlockTab selectedContentBlock={selectedContentBlock} />
    </>
  );
}
