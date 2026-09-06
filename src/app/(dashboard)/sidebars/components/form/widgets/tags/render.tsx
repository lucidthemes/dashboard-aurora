import type { SidebarsFormWidgetTags } from '../../../../schemas/form/widgets/tags.schema';

export default function SidebarsFormWidgetTagsRender({ id, title }: SidebarsFormWidgetTags) {
  return (
    <p>
      tags widget! id: {id} title: {title}
    </p>
  );
}
