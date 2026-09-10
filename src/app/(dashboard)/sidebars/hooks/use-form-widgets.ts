import { useSidebarsStore } from '../store/sidebars-store';

export default function useSidebarsFormWidgets() {
  const updateSidebarFormWidget = useSidebarsStore((state) => state.updateSidebarFormWidget);

  const handleSidebarsFormWidgetUpdate = ({
    widgetId,
    widgetFieldName,
    widgetFieldValue,
    widgetFieldValueType = 'string',
  }: {
    widgetId: string;
    widgetFieldName: string;
    widgetFieldValue: string | boolean | number;
    widgetFieldValueType?: 'string' | 'boolean' | 'number';
  }) => {
    if (!widgetId || !widgetFieldName) return;

    const fieldValue =
      widgetFieldValueType === 'number'
        ? Number(widgetFieldValue)
        : widgetFieldValueType === 'boolean'
          ? Boolean(widgetFieldValue)
          : widgetFieldValue;

    updateSidebarFormWidget({ widgetId, widgetFieldName, widgetFieldValue: fieldValue });
  };

  return { handleSidebarsFormWidgetUpdate };
}
