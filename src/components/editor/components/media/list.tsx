'use client';

import { LoadingSpinner } from '@/components/loading';

import useEditorMedia from '../../hooks/media/use-media';
import EditorMediaListSettingsItems from './settings/items';
import EditorMediaListBlockItems from './block/items';
import EditorMediaListLoadButton from './load-button';
import EditorMediaListEmpty from './empty';

interface EditorMediaListProps {
  type: 'image' | 'video';
  section: 'settings' | 'block';
}

export default function EditorMediaList({ type, section }: EditorMediaListProps) {
  const editorMediaQuery = useEditorMedia(type);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = editorMediaQuery;

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {data && data.pages[0] !== undefined ? (
        <div className="flex flex-col gap-y-4">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {section === 'settings' ? (
              <EditorMediaListSettingsItems data={data} />
            ) : (
              <EditorMediaListBlockItems type={type} data={data} />
            )}
          </ul>
          {hasNextPage && (
            <EditorMediaListLoadButton fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage} />
          )}
        </div>
      ) : (
        <EditorMediaListEmpty />
      )}
    </>
  );
}
