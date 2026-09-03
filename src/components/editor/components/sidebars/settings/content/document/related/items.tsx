import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import type { Post } from '@/schemas/post/post.schema';

import { useEditorSidebarSettingsRelatedItems } from '../../../../../../hooks/sidebars/use-related';
import EditorSettingsSidebarContentRelatedLoading from './loading';
import EditorSettingsSidebarContentRelatedError from './error';

export default function EditorSettingsSidebarContentRelatedItems({
  editorPostId,
  editorRelated,
}: {
  editorPostId?: string | null;
  editorRelated?: Post['related'];
}) {
  const { relatedItemsQuery, handleAddRelated, handleRemoveRelated } =
    useEditorSidebarSettingsRelatedItems(editorPostId);

  if (relatedItemsQuery.isPending) return <EditorSettingsSidebarContentRelatedLoading />;

  if (relatedItemsQuery.isSuccess && (!relatedItemsQuery.data || relatedItemsQuery.data?.length === 0))
    return <EditorSettingsSidebarContentRelatedError />;

  if (relatedItemsQuery.isSuccess && relatedItemsQuery.data && relatedItemsQuery.data?.length > 0) {
    return (
      <FieldSet>
        <FieldGroup className="gap-3">
          {relatedItemsQuery.data.map((relatedPost) => {
            const isSelectedRelated = editorRelated && editorRelated.includes(relatedPost.id);

            return (
              <Field key={relatedPost.id} orientation="horizontal">
                <Checkbox
                  id={relatedPost.id}
                  name={relatedPost.id}
                  className="cursor-pointer"
                  checked={isSelectedRelated ? true : false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleAddRelated(relatedPost.id);
                    } else {
                      handleRemoveRelated(relatedPost.id);
                    }
                  }}
                />
                <FieldLabel htmlFor={relatedPost.id} className="cursor-pointer font-normal">
                  {relatedPost.title}
                </FieldLabel>
              </Field>
            );
          })}
        </FieldGroup>
      </FieldSet>
    );
  }
}
