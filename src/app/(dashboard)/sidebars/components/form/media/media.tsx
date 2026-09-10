import SidebarsFormWidgetMediaEdit from './edit';
import SidebarsFormWidgetMediaAdd from './add';
import SidebarsFormWidgetMediaDialog from './dialog';

export default function SidebarsFormWidgetMedia({
  widgetId,
  widgetFieldName,
  widgetFieldMedia,
}: {
  widgetId: string;
  widgetFieldName: string;
  widgetFieldMedia?: string;
}) {
  if (!widgetId || !widgetFieldName) return;

  return (
    <>
      {widgetFieldMedia ? (
        <SidebarsFormWidgetMediaEdit
          widgetId={widgetId}
          widgetFieldName={widgetFieldName}
          widgetFieldMedia={widgetFieldMedia}
        />
      ) : (
        <SidebarsFormWidgetMediaAdd widgetId={widgetId} widgetFieldName={widgetFieldName} />
      )}
      <SidebarsFormWidgetMediaDialog />
    </>
  );
}
