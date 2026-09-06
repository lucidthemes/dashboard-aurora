import type { SidebarsFormWidgetSearch } from '../../../../schemas/form/widgets/search.schema';

export default function SidebarsFormWidgetSearchRender({ id, title }: SidebarsFormWidgetSearch) {
  return (
    <p>
      search widget! id: {id} title: {title}
    </p>
  );
}
