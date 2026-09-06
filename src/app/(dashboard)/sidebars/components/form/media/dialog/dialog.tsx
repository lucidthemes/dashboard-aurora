'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useShallow } from 'zustand/react/shallow';

import { useSidebarsStore } from '../../../../store/sidebars-store';
import SidebarsFormWidgetMediaDialogList from './list';

export default function SidebarsFormWidgetMediaDialog({ widgetFieldMedia }: { widgetFieldMedia?: string }) {
  const { mediaDialogOpen, setMediaDialogOpen } = useSidebarsStore(
    useShallow((state) => ({
      mediaDialogOpen: state.mediaDialogOpen,
      setMediaDialogOpen: state.setMediaDialogOpen,
    })),
  );

  const widgetMediaDialogClose = () => {
    setMediaDialogOpen(false);
  };

  return (
    <Dialog open={mediaDialogOpen} onOpenChange={(open) => !open && widgetMediaDialogClose()}>
      <DialogContent className="min-w-250">
        <div className="flex flex-col gap-y-7.5">
          <DialogHeader>
            <DialogTitle>Media</DialogTitle>
            <DialogDescription>Select an image to use</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-110">
            <SidebarsFormWidgetMediaDialogList widgetFieldMedia={widgetFieldMedia} />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
