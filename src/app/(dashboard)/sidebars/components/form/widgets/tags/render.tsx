import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { SidebarsFormWidgetTags } from '../../../../schemas/form/widgets/tags.schema';
import useSidebarsFormWidgets from '../../../../hooks/use-form-widgets';

export default function SidebarsFormWidgetTagsRender({ id, title, limit }: SidebarsFormWidgetTags) {
  const { handleSidebarsFormWidgetUpdate } = useSidebarsFormWidgets();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-tags-widget-title">Title</FieldLabel>
        <Input
          id="fieldgroup-tags-widget-title"
          placeholder="Title"
          defaultValue={title}
          onBlur={(e) =>
            handleSidebarsFormWidgetUpdate({
              widgetId: id,
              widgetFieldName: 'title',
              widgetFieldValue: e.target.value,
            })
          }
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldgroup-tags-widget-limit">Limit</FieldLabel>
        <Input
          id="fieldgroup-tags-widget-limit"
          type="number"
          min={0}
          placeholder="10"
          defaultValue={limit}
          onBlur={(e) =>
            handleSidebarsFormWidgetUpdate({
              widgetId: id,
              widgetFieldName: 'limit',
              widgetFieldValue: e.target.value,
              widgetFieldValueType: 'number',
            })
          }
        />
      </Field>
    </FieldGroup>
  );
}
