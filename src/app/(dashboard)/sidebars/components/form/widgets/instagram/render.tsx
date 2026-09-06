import type { SidebarsFormWidgetInstagram } from '../../../../schemas/form/widgets/instagram.schema';

export default function SidebarsFormWidgetInstagramRender({ id, title }: SidebarsFormWidgetInstagram) {
  return (
    <p>
      instagram widget! id: {id} title: {title}
    </p>
  );
}
