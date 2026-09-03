import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import EditorSettingsSidebarContentOptionsTabSidebar from './sidebar';

export default function EditorSettingsSidebarContentOptionsPage() {
  return (
    <Tabs defaultValue="sidebar" className="gap-y-5">
      <TabsList>
        <TabsTrigger value="sidebar" className="cursor-pointer">
          Sidebar
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sidebar">
        <EditorSettingsSidebarContentOptionsTabSidebar />
      </TabsContent>
    </Tabs>
  );
}
