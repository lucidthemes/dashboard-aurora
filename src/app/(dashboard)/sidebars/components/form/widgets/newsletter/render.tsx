import type { SidebarsFormWidgetNewsletter } from '../../../../schemas/form/widgets/newsletter.schema';

export default function SidebarsFormWidgetNewsletterRender({ id, title }: SidebarsFormWidgetNewsletter) {
  return (
    <p>
      newsletter widget! id: {id} title: {title}
    </p>
  );
}
