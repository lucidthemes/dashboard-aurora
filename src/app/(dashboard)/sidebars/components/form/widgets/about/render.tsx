import type { SidebarsFormWidgetAbout } from '../../../../schemas/form/widgets/about.schema';

export default function SidebarsFormWidgetAboutRender({ id, title }: SidebarsFormWidgetAbout) {
  return (
    <p>
      about widget! id: {id} title: {title}
    </p>
  );
}
