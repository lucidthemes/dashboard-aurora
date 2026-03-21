import ListSort from '@/components/list/sort';
import { Separator } from '@/components/ui/separator';

import MediaTabsHeaderTabsList from './tabs-list';
import MediaTabsHeaderButtons from './buttons';

export default function MediaTabsHeader() {
  return (
    <div className="flex justify-between">
      <MediaTabsHeaderTabsList />
      <div className="flex gap-x-5">
        <MediaTabsHeaderButtons />
        <Separator orientation="vertical" className="hidden h-6! self-center lg:block" />
        <ListSort />
      </div>
    </div>
  );
}
