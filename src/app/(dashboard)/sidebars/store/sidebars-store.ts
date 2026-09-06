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

  setCreateSheetOpen: (open: boolean) => void;

  setEditSheetOpen: (open: boolean) => void;
  setEditSheetSidebar: (sidebar: SidebarsList | null) => void;

  setDeleteDialogOpen: (open: boolean) => void;
  setDeleteDialogSidebarId: (sidebarId: string | null) => void;
};

export const useSidebarsStore = create<State & Action>((set) => ({
  // State

  sidebarFormWidgets: [],

  createSheetOpen: false,

  editSheetOpen: false,
  editSheetSidebar: null,

  deleteDialogOpen: false,
  deleteDialogSidebarId: null,

  // Actions

  setSidebarFormWidgets: (widgets) => set({ sidebarFormWidgets: widgets }),

  addSidebarFormWidget: (widgetType) =>
    set((state) => {
      if (!widgetType) return state;

      // console.log(widgetType);

      // const newWidget = {
      //   id: crypto.randomUUID(),
      //   type: widgetType,
      // };

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

  setCreateSheetOpen: (open) => set({ createSheetOpen: open }),

  setEditSheetOpen: (open) => set({ editSheetOpen: open }),
  setEditSheetSidebar: (sidebar) => set({ editSheetSidebar: sidebar }),

  setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
  setDeleteDialogSidebarId: (sidebarId) => set({ deleteDialogSidebarId: sidebarId }),
}));
