import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

import useEditorSidebarSettingsStatus from '../../../../../../hooks/sidebars/use-status';

export default function EditorSettingsSidebarContentMetadataStatus() {
  const { editorStatus, handleChangeStatus } = useEditorSidebarSettingsStatus();

  return (
    <div className="flex">
      <div className="basis-1/3">
        <span className="text-sm font-medium">Status</span>
      </div>
      <div className="grow">
        <RadioGroup defaultValue={editorStatus ?? 'draft'}>
          <div className="flex items-center gap-3">
            <RadioGroupItem
              value="draft"
              id="draft"
              className="cursor-pointer"
              onClick={() => handleChangeStatus('draft')}
            />
            <Label htmlFor="draft" className="cursor-pointer">
              Draft
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem
              value="published"
              id="published"
              className="cursor-pointer"
              onClick={() => handleChangeStatus('published')}
            />
            <Label htmlFor="published" className="cursor-pointer">
              Published
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
