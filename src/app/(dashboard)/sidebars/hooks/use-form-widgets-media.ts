import { useShallow } from 'zustand/react/shallow';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';

import { useSidebarsStore } from '../store/sidebars-store';
import { getSidebarsFormWidgetMedia } from '../data/get-form-widgets-media';
import useSidebarsFormWidgets from './use-form-widgets';
import type { SidebarsFormWidgetMedia } from '../schemas/form/media.schema';

export default function useSidebarsFormWidgetMedia() {
  const {
    mediaDialogWidgetId,
    mediaDialogWidgetFieldName,
    setMediaDialogOpen,
    setMediaDialogWidgetId,
    setMediaDialogWidgetFieldName,
  } = useSidebarsStore(
    useShallow((state) => ({
      mediaDialogWidgetId: state.mediaDialogWidgetId,
      mediaDialogWidgetFieldName: state.mediaDialogWidgetFieldName,
      setMediaDialogOpen: state.setMediaDialogOpen,
      setMediaDialogWidgetId: state.setMediaDialogWidgetId,
      setMediaDialogWidgetFieldName: state.setMediaDialogWidgetFieldName,
    })),
  );

  const { handleSidebarsFormWidgetUpdate } = useSidebarsFormWidgets();

  const sidebarsFormWidgetMediaQuery = useInfiniteQuery<
    SidebarsFormWidgetMedia | undefined,
    Error,
    InfiniteData<SidebarsFormWidgetMedia | undefined>,
    ['sidebarsFormWidgetMedia'],
    number
  >({
    queryKey: ['sidebarsFormWidgetMedia'],
    queryFn: ({ pageParam }) => getSidebarsFormWidgetMedia({ page: pageParam }),

    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const handleSidebarsFormWidgetMediaAdd = ({
    widgetId,
    widgetFieldName,
  }: {
    widgetId: string;
    widgetFieldName: string;
  }) => {
    setMediaDialogOpen(true);
    setMediaDialogWidgetId(widgetId);
    setMediaDialogWidgetFieldName(widgetFieldName);
  };

  const handleSidebarsFormWidgetMediaEdit = () => {
    setMediaDialogOpen(true);
  };

  const handleSidebarsFormWidgetMediaUpdate = ({ widgetFieldValue }: { widgetFieldValue: string }) => {
    if (!mediaDialogWidgetId || !mediaDialogWidgetFieldName) return;

    handleSidebarsFormWidgetUpdate({
      widgetId: mediaDialogWidgetId,
      widgetFieldName: mediaDialogWidgetFieldName,
      widgetFieldValue: widgetFieldValue,
    });
  };

  return {
    sidebarsFormWidgetMediaQuery,
    handleSidebarsFormWidgetMediaAdd,
    handleSidebarsFormWidgetMediaEdit,
    handleSidebarsFormWidgetMediaUpdate,
  };
}
