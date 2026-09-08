import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { SidebarsFormWidgetPosts } from '../../../../schemas/form/widgets/posts.schema';
import useSidebarsFormWidgets from '../../../../hooks/use-form-widgets';

export default function SidebarsFormWidgetPostsRender({ id, title, limit, style, location }: SidebarsFormWidgetPosts) {
  const { handleSidebarsFormWidgetUpdate } = useSidebarsFormWidgets();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-posts-widget-title">Title</FieldLabel>
        <Input
          id="fieldgroup-posts-widget-title"
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
        <FieldLabel htmlFor="fieldgroup-posts-widget-limit">Limit</FieldLabel>
        <Input
          id="fieldgroup-posts-widget-limit"
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
        <FieldLabel htmlFor="fieldgroup-posts-widget-style">Style</FieldLabel>
        <Select
          name="fieldgroup-posts-widget-style"
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
              <SelectItem key={'fieldgroup-posts-widget-style-small'} value={'small'} className="cursor-pointer">
                Small
              </SelectItem>
              <SelectItem key={'fieldgroup-posts-widget-style-wide'} value={'wide'} className="cursor-pointer">
                Wide
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldgroup-posts-widget-location">Location</FieldLabel>
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
              <SelectItem key={'fieldgroup-posts-widget-location-sidebar'} value={'sidebar'} className="cursor-pointer">
                Sidebar
              </SelectItem>
              <SelectItem key={'fieldgroup-posts-widget-location-footer'} value={'footer'} className="cursor-pointer">
                Footer
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldGroup>
  );
}
