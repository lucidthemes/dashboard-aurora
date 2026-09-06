import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { SidebarsFormWidgetSearch } from '../../../../schemas/form/widgets/search.schema';
import useSidebarsFormWidgets from '../../../../hooks/use-form-widgets';

export default function SidebarsFormWidgetSearchRender({ id, title }: SidebarsFormWidgetSearch) {
  const { handleSidebarsFormWidgetUpdate } = useSidebarsFormWidgets();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-search-widget-title">Title</FieldLabel>
        <Input
          id="fieldgroup-search-widget-title"
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
    </FieldGroup>
  );
}
