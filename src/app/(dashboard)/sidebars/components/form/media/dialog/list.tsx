'use client';

import { LoadingSpinner } from '@/components/loading';

import useSidebarsFormWidgetMedia from '../../../../hooks/use-form-widgets-media';
import SidebarsFormWidgetMediaDialogListItem from './item';
import SidebarsFormWidgetMediaDialogListLoadButton from './load-button';
import SidebarsFormWidgetMediaDialogListEmpty from './empty';

export default function SidebarsFormWidgetMediaDialogList({ widgetFieldMedia }: { widgetFieldMedia?: string }) {
  const { sidebarsFormWidgetMediaQuery } = useSidebarsFormWidgetMedia();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = sidebarsFormWidgetMediaQuery;

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {data && data.pages[0] !== undefined ? (
        <div className="flex flex-col gap-y-4">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {data.pages.flatMap((page) =>
              page?.items.map((image) => (
                <SidebarsFormWidgetMediaDialogListItem
                  key={image.id}
                  item={image}
                  widgetFieldMedia={widgetFieldMedia}
                />
              )),
            )}
          </ul>
          {hasNextPage && (
            <SidebarsFormWidgetMediaDialogListLoadButton
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </div>
      ) : (
        <SidebarsFormWidgetMediaDialogListEmpty />
      )}
    </>
  );
}
