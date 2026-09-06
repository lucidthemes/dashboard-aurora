import type { SidebarsFormWidgetProducts } from '../../../../schemas/form/widgets/products.schema';

export default function SidebarsFormWidgetProductsRender({ id, title }: SidebarsFormWidgetProducts) {
  return (
    <p>
      products widget! id: {id} title: {title}
    </p>
  );
}
