import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
import { FieldError } from '@/components/ui/field';

import useEditorSidebarSettingsSlug from '../../../../../../hooks/sidebars/use-slug';

export default function EditorSettingsSidebarContentMetadataSlug() {
  const { slug, handleChangeSlug, editorSlugErrors } = useEditorSidebarSettingsSlug();

  const labelErrorClass = editorSlugErrors && editorSlugErrors.length > 0 ? 'text-destructive' : '';
  const fieldErrorClass = editorSlugErrors && editorSlugErrors.length > 0 ? 'border-destructive' : '';

  return (
    <div className="flex">
      <div className="basis-1/3">
        <span className={`text-sm font-medium ${labelErrorClass}`}>Slug</span>
      </div>
      <div className="flex max-w-2/3 grow flex-col gap-y-2">
        <InputGroup className={fieldErrorClass}>
          <InputGroupAddon>
            <InputGroupText>/</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="editor-settings-slug"
            name="editor-settings-slug"
            className="pl-0!"
            value={slug ?? ''}
            onChange={(e) => handleChangeSlug(e)}
          />
        </InputGroup>
        <>
          {editorSlugErrors?.map((error) => (
            <FieldError key={error.code}>{error.message}</FieldError>
          ))}
        </>
      </div>
    </div>
  );
}
