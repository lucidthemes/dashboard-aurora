import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { SidebarsFormWidgetPromoBox } from '../../../../schemas/form/widgets/promoBox.schema';
import useSidebarsFormWidgets from '../../../../hooks/use-form-widgets';
import SidebarsFormWidgetMedia from '../../media';

export default function SidebarsFormWidgetPromoBoxRender({
  id,
  title,
  image,
  heading,
  subHeading,
  link,
  position,
}: SidebarsFormWidgetPromoBox) {
  const { handleSidebarsFormWidgetUpdate } = useSidebarsFormWidgets();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-promo-box-widget-title">Title</FieldLabel>
        <Input
          id="fieldgroup-promo-box-widget-title"
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
        <FieldLabel>Image</FieldLabel>
        <SidebarsFormWidgetMedia widgetId={id} widgetFieldName={'image'} widgetFieldMedia={image} />
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldgroup-promo-box-widget-heading">Heading</FieldLabel>
        <Input
          id="fieldgroup-promo-box-widget-heading"
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
        <FieldLabel htmlFor="fieldgroup-promo-box-widget-sub-heading">Sub heading</FieldLabel>
        <Input
          id="fieldgroup-promo-box-widget-sub-heading"
          placeholder="Sub heading"
          defaultValue={subHeading}
          onBlur={(e) =>
            handleSidebarsFormWidgetUpdate({
              widgetId: id,
              widgetFieldName: 'subHeading',
              widgetFieldValue: e.target.value,
            })
          }
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldgroup-promo-box-widget-link">Link</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="fieldgroup-promo-box-widget-link"
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

      <Field>
        <FieldLabel htmlFor="fieldgroup-promo-box-widget-position">Location</FieldLabel>
        <Select
          defaultValue={position}
          onValueChange={(value) =>
            handleSidebarsFormWidgetUpdate({
              widgetId: id,
              widgetFieldName: 'position',
              widgetFieldValue: value,
            })
          }
        >
          <SelectTrigger className="cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectItem key={'fieldgroup-promo-box-widget-position-sidebar'} value={'top'} className="cursor-pointer">
                Top
              </SelectItem>
              <SelectItem
                key={'fieldgroup-promo-box-widget-position-footer'}
                value={'center'}
                className="cursor-pointer"
              >
                Center
              </SelectItem>
              <SelectItem
                key={'fieldgroup-promo-box-widget-position-bottom'}
                value={'bottom'}
                className="cursor-pointer"
              >
                Bottom
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldGroup>
  );
}
