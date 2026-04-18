import { ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import useEditorSidebarSettingsExcerpt from '../../../../../../hooks/sidebars/use-excerpt';

export default function EditorSettingsSidebarContentExcerpt() {
  const { excerptOpen, handleExcerptOpen, excerpt, handleChangeExcerpt } = useEditorSidebarSettingsExcerpt();

  return (
    <div className="flex flex-col gap-y-2.5">
      <Button
        variant="ghost"
        size="lg"
        className="flex cursor-pointer justify-between px-0! hover:bg-background"
        onClick={handleExcerptOpen}
      >
        Excerpt {excerptOpen ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {excerptOpen && (
        <div className="mb-2.5">
          <Textarea
            placeholder="Type to add excerpt..."
            value={excerpt ?? ''}
            onChange={(e) => handleChangeExcerpt(e)}
          />
        </div>
      )}
    </div>
  );
}
