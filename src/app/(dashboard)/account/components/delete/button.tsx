import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function AccountDeleteButton({ handleDialogOpen }: { handleDialogOpen: () => void }) {
  return (
    <Button variant="destructive" className="cursor-pointer" onClick={() => handleDialogOpen()}>
      <Trash2 /> Delete account
    </Button>
  );
}
