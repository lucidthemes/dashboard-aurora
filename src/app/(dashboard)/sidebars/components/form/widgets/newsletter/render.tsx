import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { SidebarsFormWidgetNewsletter } from '../../../../schemas/form/widgets/newsletter.schema';
import useSidebarsFormWidgets from '../../../../hooks/use-form-widgets';

export default function SidebarsFormWidgetNewsletterRender({ id, title }: SidebarsFormWidgetNewsletter) {
  const { handleSidebarsFormWidgetUpdate } = useSidebarsFormWidgets();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-newsletter-widget-title">Title</FieldLabel>
        <Input
          id="fieldgroup-newsletter-widget-title"
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
