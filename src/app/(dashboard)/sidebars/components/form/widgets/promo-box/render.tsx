import type { SidebarsFormWidgetPromoBox } from '../../../../schemas/form/widgets/promoBox.schema';

export default function SidebarsFormWidgetPromoBoxRender({ id, title }: SidebarsFormWidgetPromoBox) {
  return (
    <p>
      promo box widget! id: {id} title: {title}
    </p>
  );
}
