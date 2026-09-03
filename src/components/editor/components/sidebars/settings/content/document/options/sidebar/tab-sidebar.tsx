import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useEditorSidebarSettingsOptionsSidebars } from '../../../../../../../hooks/sidebars/use-options-sidebars';
import EditorSettingsSidebarContentOptionsTabSidebarItems from './items';

export default function EditorSettingsSidebarContentOptionsTabSidebar() {
  const { editorSidebarOptions, handleChangeSidebarShow, handleChangeSidebarPosition } =
    useEditorSidebarSettingsOptionsSidebars();

  const editorSidebarShow = editorSidebarOptions?.show ?? true;
  const editorSidebarOption = editorSidebarOptions?.option ?? '';
  const editorSidebarPosition = editorSidebarOptions?.position ?? 'right';

  return (
    <FieldSet>
      <FieldGroup className="gap-5">
        <Field orientation="horizontal" className="w-fit">
          <Checkbox
            id="sidebar-show"
            name="sidebar-show"
            className="cursor-pointer"
            checked={editorSidebarShow}
            onCheckedChange={(value) => handleChangeSidebarShow(value as boolean)}
          />
          <FieldLabel htmlFor="sidebar-show" className="cursor-pointer font-normal">
            Show
          </FieldLabel>
        </Field>
        {editorSidebarShow === true && (
          <>
            <EditorSettingsSidebarContentOptionsTabSidebarItems editorSidebarOption={editorSidebarOption} />
            <Field>
              <Select
                defaultValue={editorSidebarPosition}
                onValueChange={(value) => handleChangeSidebarPosition(value as 'left' | 'right')}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="left" className="cursor-pointer">
                      Left
                    </SelectItem>
                    <SelectItem value="right" className="cursor-pointer">
                      Right
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </>
        )}
      </FieldGroup>
    </FieldSet>
  );
}
