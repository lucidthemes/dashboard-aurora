import { useState } from 'react';
import { Plus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useSidebarsStore } from '../../../store/sidebars-store';
import type { SidebarsFormWidgets } from '../../../schemas/form/widgets/widgets.schema';

type SidebarsFormWidgetsAddButton = {
  type: SidebarsFormWidgets['type'];
  label: string;
};

export default function SidebarsFormWidgetsAddButton({}) {
  const addSidebarFormWidget = useSidebarsStore((state) => state.addSidebarFormWidget);

  const [addWidgetOpen, setAddWidgetOpen] = useState(false);

  const widgets: SidebarsFormWidgetsAddButton[] = [
    { type: 'about', label: 'About me' },
    { type: 'instagram', label: 'Instagram feed' },
    { type: 'newsletter', label: 'Newsletter form' },
    { type: 'posts', label: 'Posts' },
    { type: 'products', label: 'Products' },
    { type: 'promoBox', label: 'Promo Box' },
    { type: 'search', label: 'Search' },
    { type: 'social', label: 'Social' },
    { type: 'tags', label: 'Tags' },
  ];

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Add widget"
        className="w-full cursor-pointer self-center"
        onClick={() => setAddWidgetOpen(!addWidgetOpen)}
      >
        {!addWidgetOpen ? <Plus /> : <X />}
      </Button>

      {addWidgetOpen && (
        <div className="flex flex-col gap-y-3">
          <span className="text-sm font-medium">Add widget</span>

          <ul className="flex flex-col gap-y-2.5">
            {widgets.map((widget) => (
              <li
                key={widget.type}
                className="cursor-pointer rounded-md bg-sidebar px-3 py-2 text-sm font-medium capitalize"
                onClick={() => addSidebarFormWidget(widget.type)}
              >
                {widget.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
