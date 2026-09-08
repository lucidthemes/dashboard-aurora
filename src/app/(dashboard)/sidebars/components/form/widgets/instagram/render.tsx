import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { SidebarsFormWidgetInstagram } from '../../../../schemas/form/widgets/instagram.schema';
import useSidebarsFormWidgets from '../../../../hooks/use-form-widgets';

export default function SidebarsFormWidgetInstagramRender({ id, title, feedId }: SidebarsFormWidgetInstagram) {
  const { handleSidebarsFormWidgetUpdate } = useSidebarsFormWidgets();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-instagram-widget-title">Title</FieldLabel>
        <Input
          id="fieldgroup-instagram-widget-title"
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
        <FieldLabel htmlFor="fieldgroup-instagram-widget-feed-id">Feed Id</FieldLabel>
        <Input
          id="fieldgroup-instagram-widget-feed-id"
          placeholder="Feed Id"
          defaultValue={feedId}
          onBlur={(e) =>
            handleSidebarsFormWidgetUpdate({
              widgetId: id,
              widgetFieldName: 'feedId',
              widgetFieldValue: e.target.value,
            })
          }
        />
      </Field>
    </FieldGroup>
  );
}
