import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

import { useSidebarsStore } from '../../../store/sidebars-store';
import SidebarsFormWidgetsRender from './render';
import SidebarsFormWidgetsEmpty from './empty';
import SidebarsFormWidgetsAddButton from './add-button';

export default function SidebarsFormWidgets({}) {
  const { sidebarFormWidgets, setSidebarFormWidgets, dragSidebarFormWidget, editSheetSidebar } = useSidebarsStore(
    useShallow((state) => ({
      sidebarFormWidgets: state.sidebarFormWidgets,
      setSidebarFormWidgets: state.setSidebarFormWidgets,
      dragSidebarFormWidget: state.dragSidebarFormWidget,
      editSheetSidebar: state.editSheetSidebar,
    })),
  );

  console.log(sidebarFormWidgets);

  useEffect(() => {
    setSidebarFormWidgets(editSheetSidebar?.widgets ?? []);
  }, [editSheetSidebar, setSidebarFormWidgets]);

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm font-medium">Widgets</span>
      <div className="flex flex-col gap-y-5 rounded-md border p-5">
        <DragDropProvider
          onDragEnd={(event) => {
            if (event.canceled) return;

            const { source } = event.operation;

            if (isSortable(source)) {
              const { initialIndex, index, id } = source;

              dragSidebarFormWidget({ widgetId: id as string, currentPosition: initialIndex, newPosition: index });
            }
          }}
        >
          {sidebarFormWidgets.length > 0 &&
            sidebarFormWidgets.map((widget, index) => (
              <SidebarsFormWidgetsRender key={widget.id} widget={widget} index={index} />
            ))}
        </DragDropProvider>
        {sidebarFormWidgets.length === 0 && <SidebarsFormWidgetsEmpty />}
        <SidebarsFormWidgetsAddButton />
      </div>
    </div>
  );
}
