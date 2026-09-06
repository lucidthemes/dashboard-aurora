import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
import { Checkbox } from '@/components/ui/checkbox';

import type { SidebarsFormWidgetAbout } from '../../../../schemas/form/widgets/about.schema';
import useSidebarsFormWidgets from '../../../../hooks/use-form-widgets';
import SidebarsFormWidgetMedia from '../../media';

export default function SidebarsFormWidgetAboutRender({
  id,
  title,
  backgroundImage,
  authorImage,
  heading,
  content,
  link,
  social,
  centered,
  padding,
}: SidebarsFormWidgetAbout) {
  const { handleSidebarsFormWidgetUpdate } = useSidebarsFormWidgets();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-about-widget-title">Title</FieldLabel>
        <Input
          id="fieldgroup-about-widget-title"
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
        <FieldLabel>Background image</FieldLabel>
        <SidebarsFormWidgetMedia widgetId={id} widgetFieldName={'backgroundImage'} widgetFieldMedia={backgroundImage} />
      </Field>

      <Field>
        <FieldLabel>Author image</FieldLabel>
        <SidebarsFormWidgetMedia widgetId={id} widgetFieldName={'authorImage'} widgetFieldMedia={authorImage} />
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldgroup-about-widget-heading">Heading</FieldLabel>
        <Input
          id="fieldgroup-about-widget-heading"
          placeholder="Heading"
          defaultValue={heading}
          onBlur={(e) =>
            handleSidebarsFormWidgetUpdate({
              widgetId: id,
              widgetFieldName: 'heading',
              widgetFieldValue: e.target.value,
            })
          }
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldgroup-about-widget-content">Content</FieldLabel>
        <Input
          id="fieldgroup-about-widget-content"
          placeholder="Content"
          defaultValue={content}
          onBlur={(e) =>
            handleSidebarsFormWidgetUpdate({
              widgetId: id,
              widgetFieldName: 'content',
              widgetFieldValue: e.target.value,
            })
          }
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldgroup-about-widget-link">Link</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="fieldgroup-about-widget-link"
            className="pl-0.5!"
            placeholder="example.com"
            defaultValue={link}
            onBlur={(e) =>
              handleSidebarsFormWidgetUpdate({
                widgetId: id,
                widgetFieldName: 'link',
                widgetFieldValue: e.target.value,
              })
            }
          />
        </InputGroup>
      </Field>

      <Field orientation="horizontal">
        <Checkbox
          id="fieldgroup-about-widget-social"
          className="cursor-pointer"
          checked={social ?? false}
          onCheckedChange={(value) =>
            handleSidebarsFormWidgetUpdate({
              widgetId: id,
              widgetFieldName: 'social',
              widgetFieldValue: value,
            })
          }
        />
        <FieldLabel>Social icons</FieldLabel>
      </Field>

      <Field orientation="horizontal">
        <Checkbox
          id="fieldgroup-about-widget-centered"
          className="cursor-pointer"
          checked={centered ?? false}
          onCheckedChange={(value) =>
            handleSidebarsFormWidgetUpdate({
              widgetId: id,
              widgetFieldName: 'centered',
              widgetFieldValue: value,
            })
          }
        />
        <FieldLabel>Centered</FieldLabel>
      </Field>

      <Field orientation="horizontal">
        <Checkbox
          id="fieldgroup-about-widget-padding"
          className="cursor-pointer"
          checked={padding ?? false}
          onCheckedChange={(value) =>
            handleSidebarsFormWidgetUpdate({
              widgetId: id,
              widgetFieldName: 'padding',
              widgetFieldValue: value,
            })
          }
        />
        <FieldLabel>Padding</FieldLabel>
      </Field>
    </FieldGroup>
  );
}
