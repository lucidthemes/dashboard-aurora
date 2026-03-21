import type { Media } from '@/schemas/media.schema';

import MediaTabsContentLayoutGridItem from './item';

export default function MediaTabsContentLayoutGrid({ media }: { media: Media[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {media.map((item) => (
        <MediaTabsContentLayoutGridItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
