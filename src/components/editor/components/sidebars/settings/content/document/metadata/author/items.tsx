import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useEditorSidebarSettingsAuthorsItems } from '../../../../../../../hooks/sidebars/use-authors';
import EditorSettingsSidebarContentMetadataAuthorLoading from './loading';
import EditorSettingsSidebarContentMetadataAuthorError from './error';

export default function EditorSettingsSidebarContentMetadataAuthorItems({
  editorAuthorId,
  editorAuthorErrors,
}: {
  editorAuthorId?: string;
  editorAuthorErrors?: {
    path: string;
    code: string;
    message?: string;
  }[];
}) {
  const { authorsItemsQuery, handleChangeAuthor } = useEditorSidebarSettingsAuthorsItems();

  if (authorsItemsQuery.isPending) return <EditorSettingsSidebarContentMetadataAuthorLoading />;

  if (authorsItemsQuery.isSuccess && (!authorsItemsQuery.data || authorsItemsQuery.data?.length === 0))
    return <EditorSettingsSidebarContentMetadataAuthorError />;

  if (authorsItemsQuery.isSuccess && authorsItemsQuery.data && authorsItemsQuery.data?.length > 0) {
    const fieldErrorClass = editorAuthorErrors && editorAuthorErrors.length > 0 ? 'border-destructive' : '';

    return (
      <Select defaultValue={editorAuthorId ?? ''} onValueChange={(value) => handleChangeAuthor(value)}>
        <SelectTrigger className={`w-full cursor-pointer ${fieldErrorClass}`}>
          <SelectValue placeholder="Author" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {authorsItemsQuery.data.map((author) => (
              <SelectItem key={author.id} value={author.id} className="cursor-pointer">
                {author.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
}
