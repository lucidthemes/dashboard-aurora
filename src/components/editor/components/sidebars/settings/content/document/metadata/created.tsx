import { dateTimeFormat } from '@/lib/formatters';

import { useEditorStore } from '../../../../../../store/editor-store';

export default function EditorSettingsSidebarContentMetadataCreated() {
  const createdDate = useEditorStore((state) => state.editorContent?.created_at);

  if (!createdDate) return null;

  const formattedCreatedDate = dateTimeFormat(createdDate);

  return (
    <div className="flex">
      <div className="basis-1/3">
        <span className="text-sm font-medium">Created</span>
      </div>
      <div className="grow">
        <span className="text-sm">{formattedCreatedDate}</span>
      </div>
    </div>
  );
}
