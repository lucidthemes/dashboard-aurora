'use client';

import { useShallow } from 'zustand/react/shallow';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useEditorStore } from '../../store/editor-store';
import EditorMediaList from './list';

export default function EditorMedia() {
  const { mediaDialogOpen, mediaDialogType, mediaDialogContext, mediaDialogCount, setMediaDialogOpen } = useEditorStore(
    useShallow((state) => ({
      mediaDialogOpen: state.mediaDialogOpen,
      mediaDialogType: state.mediaDialogType,
      mediaDialogContext: state.mediaDialogContext,
      mediaDialogCount: state.mediaDialogCount,
      setMediaDialogOpen: state.setMediaDialogOpen,
    })),
  );

  if (!mediaDialogType || !mediaDialogContext || !mediaDialogCount) return;

  const mediaDialogClose = () => setMediaDialogOpen(false);

  let dialogDescription = '';

  if (mediaDialogType === 'image') {
    dialogDescription = mediaDialogCount == 'multiple' ? 'images' : 'an image';
  } else if (mediaDialogType === 'video') {
    dialogDescription = mediaDialogCount == 'multiple' ? 'videos' : 'a video';
  }

  return (
    <Dialog open={mediaDialogOpen} onOpenChange={(open) => !open && mediaDialogClose()}>
      <DialogContent className="min-w-250">
        <div className="flex flex-col gap-y-7.5">
          <DialogHeader>
            <DialogTitle>Media</DialogTitle>
            {dialogDescription && <DialogDescription>Select {dialogDescription} to use</DialogDescription>}
          </DialogHeader>
          <ScrollArea className="max-h-110">
            <EditorMediaList type={mediaDialogType} section={mediaDialogContext} />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
