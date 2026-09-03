import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import type { Post } from '@/schemas/post/post.schema';

import { useEditorSidebarSettingsCategoriesItems } from '../../../../../../hooks/sidebars/use-categories';
import EditorSettingsSidebarContentCategoriesLoading from './loading';
import EditorSettingsSidebarContentCategoriesError from './error';

export default function EditorSettingsSidebarContentCategoriesItems({
  editorCategories,
}: {
  editorCategories?: Post['categories'];
}) {
  const { categoriesItemsQuery, handleAddCategory, handleRemoveCategory } = useEditorSidebarSettingsCategoriesItems();

  if (categoriesItemsQuery.isPending) return <EditorSettingsSidebarContentCategoriesLoading />;

  if (categoriesItemsQuery.isSuccess && (!categoriesItemsQuery.data || categoriesItemsQuery.data?.length === 0))
    return <EditorSettingsSidebarContentCategoriesError />;

  if (categoriesItemsQuery.isSuccess && categoriesItemsQuery.data && categoriesItemsQuery.data?.length > 0) {
    return (
      <FieldSet>
        <FieldGroup className="gap-3">
          {categoriesItemsQuery.data.map((category) => {
            const isSelectedCategory = editorCategories && editorCategories.includes(category.id);

            return (
              <Field key={category.id} orientation="horizontal">
                <Checkbox
                  id={category.id}
                  name={category.id}
                  className="cursor-pointer"
                  checked={isSelectedCategory ? true : false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleAddCategory(category.id);
                    } else {
                      handleRemoveCategory(category.id);
                    }
                  }}
                />
                <FieldLabel htmlFor={category.id} className="cursor-pointer font-normal">
                  {category.name}
                </FieldLabel>
              </Field>
            );
          })}
        </FieldGroup>
      </FieldSet>
    );
  }
}
