import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import useEditorSidebarSettingsOptionsHeader from '../../../../../../../hooks/sidebars/use-options-header';

export default function EditorSettingsSidebarContentOptionsTabHeader() {
  const { editorHeaderOptions, handleChangeHeaderShow, handleChangeHeaderLayout, handleChangeHeaderBesideSidebar } =
    useEditorSidebarSettingsOptionsHeader();

  const editorHeaderShow = editorHeaderOptions?.show ?? true;
  const editorHeaderLayout = editorHeaderOptions?.layout ?? 'outside-below';
  const editorHeaderBesideSidebar = editorHeaderOptions?.besideSidebar ?? true;

  return (
    <FieldSet>
      <FieldGroup className="gap-5">
        <Field orientation="horizontal" className="w-fit">
          <Checkbox
            id="header-show"
            name="header-show"
            className="cursor-pointer"
            checked={editorHeaderShow}
            onCheckedChange={(value) => handleChangeHeaderShow(value as boolean)}
          />
          <FieldLabel htmlFor="header-show" className="cursor-pointer font-normal">
            Show
          </FieldLabel>
        </Field>
        {editorHeaderShow === true && (
          <>
            <Field>
              <Select
                defaultValue={editorHeaderLayout}
                onValueChange={(value) =>
                  handleChangeHeaderLayout(
                    value as
                      | 'outside-above'
                      | 'outside-below'
                      | 'split-narrow'
                      | 'split-wide'
                      | 'split-full'
                      | 'overlay-narrow'
                      | 'overlay-wide'
                      | 'overlay-full',
                  )
                }
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="outside-above" className="cursor-pointer">
                      Outside above
                    </SelectItem>
                    <SelectItem value="outside-below" className="cursor-pointer">
                      Outside below
                    </SelectItem>
                    <SelectItem value="split-narrow" className="cursor-pointer">
                      Split narrow
                    </SelectItem>
                    <SelectItem value="split-wide" className="cursor-pointer">
                      Split wide
                    </SelectItem>
                    <SelectItem value="split-full" className="cursor-pointer">
                      Split full
                    </SelectItem>
                    <SelectItem value="overlay-narrow" className="cursor-pointer">
                      Overlay narrow
                    </SelectItem>
                    <SelectItem value="overlay-wide" className="cursor-pointer">
                      Overlay wide
                    </SelectItem>
                    <SelectItem value="overlay-full" className="cursor-pointer">
                      Overlay full
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field orientation="horizontal" className="w-fit">
              <Checkbox
                id="header-beside-sidebar"
                name="header-beside-sidebar"
                className="cursor-pointer"
                checked={editorHeaderBesideSidebar}
                onCheckedChange={(value) => handleChangeHeaderBesideSidebar(value as boolean)}
              />
              <FieldLabel htmlFor="header-beside-sidebar" className="cursor-pointer font-normal">
                Beside sidebar
              </FieldLabel>
            </Field>
          </>
        )}
      </FieldGroup>
    </FieldSet>
  );
}
