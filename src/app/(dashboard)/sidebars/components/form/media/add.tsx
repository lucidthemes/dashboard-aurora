import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import useSidebarsFormWidgetMedia from '../../../hooks/use-form-widgets-media';

export default function SidebarsFormWidgetMediaAdd({
  widgetId,
  widgetFieldName,
}: {
  widgetId: string;
  widgetFieldName: string;
}) {
  const { handleSidebarsFormWidgetMediaAdd } = useSidebarsFormWidgetMedia();

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full cursor-pointer"
      onClick={() => handleSidebarsFormWidgetMediaAdd({ widgetId, widgetFieldName })}
    >
      <Plus />
    </Button>
  );
}
