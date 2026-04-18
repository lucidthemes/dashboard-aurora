import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import type { Post } from '@/schemas/post/post.schema';

import { useEditorSidebarSettingsTagsItems } from '../../../../../../hooks/sidebars/use-tags';
import EditorSettingsSidebarContentTagsLoading from './loading';
import EditorSettingsSidebarContentTagsError from './error';

export default function EditorSettingsSidebarContentTagsItems({ editorTags }: { editorTags?: Post['tags'] }) {
  const { tagsItemsQuery, handleAddTag, handleRemoveTag } = useEditorSidebarSettingsTagsItems();

  if (tagsItemsQuery.isPending) return <EditorSettingsSidebarContentTagsLoading />;

  if (tagsItemsQuery.isSuccess && (!tagsItemsQuery.data || tagsItemsQuery.data?.length === 0))
    return <EditorSettingsSidebarContentTagsError />;

  if (tagsItemsQuery.isSuccess && tagsItemsQuery.data && tagsItemsQuery.data?.length > 0) {
    return (
      <FieldSet>
        <FieldGroup className="gap-3">
          {tagsItemsQuery.data.map((tag) => {
            const isSelectedTag = editorTags && editorTags.includes(tag.id);

            return (
              <Field key={tag.id} orientation="horizontal">
                <Checkbox
                  id={tag.id}
                  name={tag.id}
                  className="cursor-pointer"
                  checked={isSelectedTag ? true : false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleAddTag(tag.id);
                    } else {
                      handleRemoveTag(tag.id);
                    }
                  }}
                />
                <FieldLabel htmlFor={tag.id} className="cursor-pointer font-normal">
                  {tag.name}
                </FieldLabel>
              </Field>
            );
          })}
        </FieldGroup>
      </FieldSet>
    );
  }
}
