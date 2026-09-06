import { useSidebarsStore } from '../store/sidebars-store';

export default function useSidebarsFormWidgets() {
  const updateSidebarFormWidget = useSidebarsStore((state) => state.updateSidebarFormWidget);

  const handleSidebarsFormWidgetUpdate = ({
    widgetId,
    widgetFieldName,
    widgetFieldValue,
  }: {
    widgetId: string;
    widgetFieldName: string;
    widgetFieldValue: string | boolean;
  }) => {
    if (!widgetId || !widgetFieldName) return;

    updateSidebarFormWidget({ widgetId, widgetFieldName, widgetFieldValue });
  };

  return { handleSidebarsFormWidgetUpdate };
}
