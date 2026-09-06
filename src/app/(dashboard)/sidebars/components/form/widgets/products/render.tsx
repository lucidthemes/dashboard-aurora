import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { SidebarsFormWidgetProducts } from '../../../../schemas/form/widgets/products.schema';
import useSidebarsFormWidgets from '../../../../hooks/use-form-widgets';

export default function SidebarsFormWidgetProductsRender({
  id,
  title,
  limit,
  style,
  location,
}: SidebarsFormWidgetProducts) {
  const { handleSidebarsFormWidgetUpdate } = useSidebarsFormWidgets();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-products-widget-title">Title</FieldLabel>
        <Input
          id="fieldgroup-products-widget-title"
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
        <FieldLabel htmlFor="fieldgroup-products-widget-limit">Limit</FieldLabel>
        <Input
          id="fieldgroup-products-widget-limit"
          type="number"
          min={1}
          placeholder="3"
          defaultValue={limit}
          onBlur={(e) =>
            handleSidebarsFormWidgetUpdate({
              widgetId: id,
              widgetFieldName: 'limit',
              widgetFieldValue: e.target.value,
            })
          }
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldgroup-products-widget-style">Style</FieldLabel>
        <Select
          name="fieldgroup-products-widget-style"
          defaultValue={style}
          onValueChange={(value) =>
            handleSidebarsFormWidgetUpdate({
              widgetId: id,
              widgetFieldName: 'style',
              widgetFieldValue: value,
            })
          }
        >
          <SelectTrigger className="cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectItem key={'fieldgroup-products-widget-style-small'} value={'small'} className="cursor-pointer">
                Small
              </SelectItem>
              <SelectItem key={'fieldgroup-products-widget-style-wide'} value={'wide'} className="cursor-pointer">
                Wide
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldgroup-products-widget-location">Location</FieldLabel>
        <Select
          defaultValue={location}
          onValueChange={(value) =>
            handleSidebarsFormWidgetUpdate({
              widgetId: id,
              widgetFieldName: 'location',
              widgetFieldValue: value,
            })
          }
        >
          <SelectTrigger className="cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectItem
                key={'fieldgroup-products-widget-location-sidebar'}
                value={'sidebar'}
                className="cursor-pointer"
              >
                Sidebar
              </SelectItem>
              <SelectItem
                key={'fieldgroup-products-widget-location-footer'}
                value={'footer'}
                className="cursor-pointer"
              >
                Footer
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldGroup>
  );
}
