import type { InfiniteData } from '@tanstack/react-query';

import type { EditorMedia } from '../../../schemas/media/media.schema';

import EditorMediaListSettingsItem from './item';

interface EditorMediaListSettingsItemsProps {
  data: InfiniteData<EditorMedia | undefined>;
}

export default function EditorMediaListSettingsItems({ data }: EditorMediaListSettingsItemsProps) {
  return (
    <>
      {data.pages.flatMap((page) =>
        page?.items.map((item) => <EditorMediaListSettingsItem key={item.id} item={item} />),
      )}
    </>
  );
}
