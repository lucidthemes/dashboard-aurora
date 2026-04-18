import { Field } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useEditorSidebarSettingsOptionsSidebarsItems } from '../../../../../../../hooks/sidebars/use-options-sidebars';
import EditorSettingsSidebarContentOptionsTabSidebarLoading from './loading';
import EditorSettingsSidebarContentOptionsTabSidebarError from './error';

export default function EditorSettingsSidebarContentOptionsTabSidebarItems({
  editorSidebarOption,
}: {
  editorSidebarOption?: string;
}) {
  const { sidebarsItemsQuery, handleChangeSidebarOption } = useEditorSidebarSettingsOptionsSidebarsItems();

  if (sidebarsItemsQuery.isPending) return;
  <EditorSettingsSidebarContentOptionsTabSidebarLoading />;

  if (sidebarsItemsQuery.isSuccess && (!sidebarsItemsQuery.data || sidebarsItemsQuery.data?.length === 0)) return;
  <EditorSettingsSidebarContentOptionsTabSidebarError />;

  if (sidebarsItemsQuery.isSuccess && sidebarsItemsQuery.data && sidebarsItemsQuery.data?.length > 0)
    return (
      <Field>
        <Select defaultValue={editorSidebarOption} onValueChange={(value) => handleChangeSidebarOption(value)}>
          <SelectTrigger className="cursor-pointer">
            <SelectValue placeholder="Sidebar" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sidebarsItemsQuery.data.map((sidebar) => (
                <SelectItem key={sidebar.id} value={sidebar.name} className="cursor-pointer">
                  {sidebar.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    );
}
