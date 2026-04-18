import EditorSettingsSidebarContentMetadataStatus from './status';
import EditorSettingsSidebarContentMetadataSlug from './slug';
import EditorSettingsSidebarContentMetadataAuthor from './author';
import EditorSettingsSidebarContentMetadataCreated from './created';
import EditorSettingsSidebarContentMetadataUpdated from './updated';

export default function EditorSettingsSidebarContentMetadata() {
  return (
    <div className="flex flex-col gap-y-5 pb-2.5">
      <EditorSettingsSidebarContentMetadataStatus />
      <EditorSettingsSidebarContentMetadataSlug />
      <EditorSettingsSidebarContentMetadataAuthor />
      <EditorSettingsSidebarContentMetadataCreated />
      <EditorSettingsSidebarContentMetadataUpdated />
    </div>
  );
}
