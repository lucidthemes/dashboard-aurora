import type { SidebarsFormWidgetSocial } from '../../../../schemas/form/widgets/social.schema';

export default function SidebarsFormWidgetSocialRender({ id, title }: SidebarsFormWidgetSocial) {
  return (
    <p>
      social widget! id: {id} title: {title}
    </p>
  );
}
