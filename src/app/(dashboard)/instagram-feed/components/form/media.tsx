import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInstagramFeedStore } from '@/store/instagram-feed-store';

import InstagramFeedFormMediaList from './media-list';

export default function InstagramFeedFormMedia() {
  const { formMediaOpen, setFormMediaOpen } = useInstagramFeedStore();

  const formMediaDialogClose = () => {
    setFormMediaOpen(false);
  };

  return (
    <Dialog open={formMediaOpen} onOpenChange={(open) => !open && formMediaDialogClose()}>
      <DialogContent className="min-w-250">
        <div className="flex flex-col gap-y-7.5">
          <DialogHeader>
            <DialogTitle>Media</DialogTitle>
            <DialogDescription>Select images to use for the feed</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-110">
            <InstagramFeedFormMediaList />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
