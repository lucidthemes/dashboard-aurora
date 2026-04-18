import { ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/ui/field';

import { useEditorSidebarSettingsImage } from '../../../../../../hooks/sidebars/use-image';
import EditorSettingsSidebarContentImageAdd from './add';
import EditorSettingsSidebarContentImageEdit from './edit';

export default function EditorSettingsSidebarContentImage() {
  const { imageOpen, handleImageOpen, editorMediaId, editorMediaErrors } = useEditorSidebarSettingsImage();

  const labelErrorClass =
    editorMediaErrors && editorMediaErrors.length > 0 ? 'text-destructive hover:text-destructive' : '';

  return (
    <div className="flex flex-col gap-y-2.5">
      <Button
        variant="ghost"
        size="lg"
        className={`flex cursor-pointer justify-between px-0! hover:bg-background ${labelErrorClass}`}
        onClick={handleImageOpen}
      >
        Image {imageOpen ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {imageOpen && (
        <div className="mb-2.5 flex flex-col gap-y-2">
          <>
            {editorMediaErrors?.map((error) => (
              <FieldError key={error.code}>{error.message}</FieldError>
            ))}
          </>
          {editorMediaId ? (
            <EditorSettingsSidebarContentImageEdit editorMediaId={editorMediaId} />
          ) : (
            <EditorSettingsSidebarContentImageAdd />
          )}
        </div>
      )}
    </div>
  );
}
