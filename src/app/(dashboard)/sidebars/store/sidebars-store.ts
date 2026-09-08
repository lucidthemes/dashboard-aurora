import { create } from 'zustand';

import type { SidebarsList } from '../schemas/list.schema';
import type { SidebarsFormWidgets } from '../schemas/form/widgets/widgets.schema';
import { sidebarsFormWidgetsRegistry } from '../components/form/widgets/registry';

type State = {
  sidebarFormWidgets: SidebarsFormWidgets[];

  createSheetOpen: boolean;

  editSheetOpen: boolean;
  editSheetSidebar: SidebarsList | null;

  deleteDialogOpen: boolean;
  deleteDialogSidebarId: string | null;

  mediaDialogOpen: boolean;
  mediaDialogWidgetId: string | null;
  mediaDialogWidgetFieldName: string | null;
};

type Action = {
  setSidebarFormWidgets: (widgets: SidebarsFormWidgets[]) => void;
  addSidebarFormWidget: (widgetType: SidebarsFormWidgets['type']) => void;
  removeSidebarFormWidget: (widgetId: string) => void;
  dragSidebarFormWidget: ({
    widgetId,
    currentPosition,
    newPosition,
  }: {
    widgetId: string;
    currentPosition: number;
    newPosition: number;
  }) => void;
  updateSidebarFormWidget: ({
    widgetId,
    widgetFieldName,
    widgetFieldValue,
  }: {
    widgetId: string;
    widgetFieldName: string;
    widgetFieldValue: string | boolean;
  }) => void;

  setCreateSheetOpen: (open: boolean) => void;

  setEditSheetOpen: (open: boolean) => void;
  setEditSheetSidebar: (sidebar: SidebarsList | null) => void;

  setDeleteDialogOpen: (open: boolean) => void;
  setDeleteDialogSidebarId: (sidebarId: string | null) => void;

  setMediaDialogOpen: (open: boolean) => void;
  setMediaDialogWidgetId: (widgetId: string | null) => void;
  setMediaDialogWidgetFieldName: (widgetFieldName: string | null) => void;
};

export const useSidebarsStore = create<State & Action>((set) => ({
  // State

  sidebarFormWidgets: [],

  createSheetOpen: false,

  editSheetOpen: false,
  editSheetSidebar: null,

  deleteDialogOpen: false,
  deleteDialogSidebarId: null,

  mediaDialogOpen: false,
  mediaDialogWidgetId: null,
  mediaDialogWidgetFieldName: null,

  // Actions

  setSidebarFormWidgets: (widgets) => set({ sidebarFormWidgets: widgets }),

  addSidebarFormWidget: (widgetType) =>
    set((state) => {
      if (!widgetType) return state;

      const newWidget = sidebarsFormWidgetsRegistry[widgetType]?.create();

      if (!newWidget) return state;

      return { sidebarFormWidgets: [...state.sidebarFormWidgets, newWidget] };
    }),

  removeSidebarFormWidget: (widgetid) =>
    set((state) => {
      if (!widgetid) return state;

      const updatedSidebarFormWidgets = state.sidebarFormWidgets.filter((widget) => widget.id !== widgetid);

      return { sidebarFormWidgets: updatedSidebarFormWidgets };
    }),

  dragSidebarFormWidget: ({ widgetId, currentPosition, newPosition }) =>
    set((state) => {
      if (!widgetId) return state;

      const blockToMove = state.sidebarFormWidgets.find((widget) => widget.id === widgetId);

      if (!blockToMove) return state;

      const updatedSidebarFormWidgets = state.sidebarFormWidgets
        .toSpliced(currentPosition, 1) // remove widget at current position
        .toSpliced(newPosition, 0, blockToMove); // insert widget into new position

      return { sidebarFormWidgets: updatedSidebarFormWidgets };
    }),

  updateSidebarFormWidget: ({ widgetId, widgetFieldName, widgetFieldValue }) =>
    set((state) => {
      if (!widgetId || !widgetFieldName) return state;

      const updatedSidebarFormWidgets = state.sidebarFormWidgets.map((widget) => {
        if (widget.id === widgetId) {
          const updatedSidebarFormWidget = {
            ...widget,
            [widgetFieldName]: widgetFieldValue,
          };

          return updatedSidebarFormWidget;
        } else {
          return widget;
        }
      });

      return { sidebarFormWidgets: updatedSidebarFormWidgets };
    }),

  setCreateSheetOpen: (open) => set({ createSheetOpen: open }),

  setEditSheetOpen: (open) => set({ editSheetOpen: open }),
  setEditSheetSidebar: (sidebar) => set({ editSheetSidebar: sidebar }),

  setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
  setDeleteDialogSidebarId: (sidebarId) => set({ deleteDialogSidebarId: sidebarId }),

  setMediaDialogOpen: (open) => set({ mediaDialogOpen: open }),
  setMediaDialogWidgetId: (widgetId) => set({ mediaDialogWidgetId: widgetId }),
  setMediaDialogWidgetFieldName: (widgetFieldName) => set({ mediaDialogWidgetFieldName: widgetFieldName }),
}));
