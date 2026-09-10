import Image from 'next/image';
import { Pencil, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import useSidebarsFormWidgetMedia from '../../../hooks/use-form-widgets-media';

export default function SidebarsFormWidgetMediaEdit({
  widgetId,
  widgetFieldName,
  widgetFieldMedia,
}: {
  widgetId: string;
  widgetFieldName: string;
  widgetFieldMedia: string;
}) {
  const { handleSidebarsFormWidgetMediaEdit, handleSidebarsFormWidgetMediaRemove } = useSidebarsFormWidgetMedia();

  return (
    <div className="relative overflow-hidden rounded-md bg-sidebar">
      <Image src={widgetFieldMedia} alt={widgetFieldName} width={300} height={300} className="w-full" />
      <div className="absolute top-2.5 right-2.5 flex gap-x-2.5">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="cursor-pointer bg-secondary"
          onClick={() => handleSidebarsFormWidgetMediaEdit({ widgetId, widgetFieldName, widgetFieldMedia })}
        >
          <Pencil />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="cursor-pointer bg-secondary"
          onClick={() => handleSidebarsFormWidgetMediaRemove({ widgetId, widgetFieldName })}
        >
          <X />
        </Button>
      </div>
    </div>
  );
}
