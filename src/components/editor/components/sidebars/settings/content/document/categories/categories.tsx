import { ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useEditorSidebarSettingsCategories } from '../../../../../../hooks/sidebars/use-categories';
import EditorSettingsSidebarContentCategoriesItems from './items';

export default function EditorSettingsSidebarContentCategories() {
  const { categoriesOpen, handleCategoriesOpen, editorCategories } = useEditorSidebarSettingsCategories();

  return (
    <div className="flex flex-col gap-y-2.5">
      <Button
        variant="ghost"
        size="lg"
        className="flex cursor-pointer justify-between px-0! hover:bg-background"
        onClick={handleCategoriesOpen}
      >
        Categories {categoriesOpen ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {categoriesOpen && (
        <div className="mb-2.5">
          <EditorSettingsSidebarContentCategoriesItems editorCategories={editorCategories} />
        </div>
      )}
    </div>
  );
}
