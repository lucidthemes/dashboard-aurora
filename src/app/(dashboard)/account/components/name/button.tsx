import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function AccountNameEditButton({ handleFormShown }: { handleFormShown: () => void }) {
  return (
    <Button variant="outline" size="icon-sm" className="cursor-pointer" onClick={() => handleFormShown()}>
      <Pencil />
    </Button>
  );
}
