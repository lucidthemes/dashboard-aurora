import { dateTimeFormat } from '@/lib/formatters';

import { useEditorStore } from '../../../../../../store/editor-store';

export default function EditorSettingsSidebarContentMetadataUpdated() {
  const updatedDate = useEditorStore((state) => state.editorContent?.updated_at);

  if (!updatedDate) return null;

  const formattedCreatedDate = dateTimeFormat(updatedDate);

  return (
    <div className="flex">
      <div className="basis-1/3">
        <span className="text-sm font-medium">Updated</span>
      </div>
      <div className="grow">
        <span className="text-sm">{formattedCreatedDate}</span>
      </div>
    </div>
  );
}
