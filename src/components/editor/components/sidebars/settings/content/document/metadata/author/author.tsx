import { FieldError } from '@/components/ui/field';

import { useEditorSidebarSettingsAuthors } from '../../../../../../../hooks/sidebars/use-authors';
import EditorSettingsSidebarContentMetadataAuthorItems from './items';

export default function EditorSettingsSidebarContentMetadataAuthor() {
  const { editorAuthorId, editorAuthorErrors } = useEditorSidebarSettingsAuthors();

  const labelErrorClass = editorAuthorErrors && editorAuthorErrors.length > 0 ? 'text-destructive' : '';

  return (
    <div className="flex">
      <div className="basis-1/3">
        <span className={`text-sm font-medium ${labelErrorClass}`}>Author</span>
      </div>
      <div className="flex max-w-2/3 grow flex-col gap-y-2">
        <EditorSettingsSidebarContentMetadataAuthorItems
          editorAuthorId={editorAuthorId}
          editorAuthorErrors={editorAuthorErrors}
        />

        <>
          {editorAuthorErrors?.map((error) => (
            <FieldError key={error.code}>{error.message}</FieldError>
          ))}
        </>
      </div>
    </div>
  );
}
