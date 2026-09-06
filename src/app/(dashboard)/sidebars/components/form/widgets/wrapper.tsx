import { useState } from 'react';
import { GripVertical, ChevronDown, ChevronUp, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import type { SidebarsFormWidgets } from '../../../schemas/form/widgets/widgets.schema';
import { useSidebarsStore } from '../../../store/sidebars-store';

type WidgetTypeLabelType = {
  [K in SidebarsFormWidgets['type']]: string;
};

export default function SidebarsFormWidgetsRenderWrapper({
  widget,
  blockDragRef,
  blockDragHandleRef,
  children,
}: {
  widget: SidebarsFormWidgets;
  blockDragRef: (element: Element | null) => void;
  blockDragHandleRef: (element: Element | null) => void;
  children: React.ReactNode;
}) {
  const [widgetOpen, setWidgetOpen] = useState(false);

  const removeSidebarFormWidget = useSidebarsStore((state) => state.removeSidebarFormWidget);

  if (!widget) return;

  const activeClass = widgetOpen ? 'rounded-bl-[0] rounded-br-[0] border-b-0' : '';

  const widgetTypeLabel: WidgetTypeLabelType = {
    about: 'About me',
    instagram: 'Instagram feed',
    newsletter: 'Newsletter form',
    posts: 'Posts',
    products: 'Products',
    promoBox: 'Promo Box',
    search: 'Search',
    social: 'Social',
    tags: 'Tags',
  };

  return (
    <div ref={blockDragRef}>
      <div className={`flex justify-between rounded-md border bg-sidebar p-2.5 ${activeClass}`}>
        <div className="flex items-center gap-x-2">
          <GripVertical size={15} className="cursor-grab" tabIndex={-1} ref={blockDragHandleRef} />
          <span className="text-sm font-medium capitalize">{widgetTypeLabel[widget.type] ?? ''}</span>
        </div>
        <div className="flex gap-x-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="cursor-pointer rounded-full"
            onClick={() => setWidgetOpen(!widgetOpen)}
          >
            {!widgetOpen ? <ChevronDown /> : <ChevronUp />}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="cursor-pointer rounded-full"
            onClick={() => removeSidebarFormWidget(widget.id)}
          >
            <X />
          </Button>
        </div>
      </div>
      {widgetOpen && <div className="rounded-md rounded-tl-[0] rounded-tr-[0] border border-t-0 p-2.5">{children}</div>}
    </div>
  );
}
