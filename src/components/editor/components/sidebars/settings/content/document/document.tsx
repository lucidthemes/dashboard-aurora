import { TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

import EditorSettingsSidebarContentMetadata from './metadata';
import EditorSettingsSidebarContentImage from './image';
import EditorSettingsSidebarContentExcerpt from './excerpt';
import EditorSettingsSidebarContentCategories from './categories';
import EditorSettingsSidebarContentTags from './tags';
import EditorSettingsSidebarContentRelated from './related';
import EditorSettingsSidebarContentOptions from './options';

export default function EditorSettingsSidebarContentDocumentTab({ type }: { type: 'post' | 'page' }) {
  return (
    <TabsContent value="document">
      <div className="flex-1 overflow-y-auto p-5">
        <div className="flex flex-col gap-y-2.5">
          <EditorSettingsSidebarContentMetadata />
          <Separator />
          {type === 'post' && (
            <>
              <EditorSettingsSidebarContentImage />
              <Separator />
              <EditorSettingsSidebarContentExcerpt />
              <Separator />
              <EditorSettingsSidebarContentCategories />
              <Separator />
              <EditorSettingsSidebarContentTags />
              <Separator />
              <EditorSettingsSidebarContentRelated />
              <Separator />
            </>
          )}
          <EditorSettingsSidebarContentOptions type={type} />
        </div>
      </div>
    </TabsContent>
  );
}
