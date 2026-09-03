import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';

import EditorSettingsSidebarContentOptionsPost from './options-post';
import EditorSettingsSidebarContentOptionsPage from './options-page';

export default function EditorSettingsSidebarContentOptions({ type }: { type: 'post' | 'page' }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-2.5">
      <Button
        variant="ghost"
        size="lg"
        className="flex cursor-pointer justify-between px-0! hover:bg-background"
        onClick={() => setOpen((prevState) => !prevState)}
      >
        Options {open ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {open && (
        <>
          {type === 'post' && <EditorSettingsSidebarContentOptionsPost />}
          {type === 'page' && <EditorSettingsSidebarContentOptionsPage />}
        </>
      )}
    </div>
  );
}
