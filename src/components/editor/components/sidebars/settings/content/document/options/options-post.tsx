import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import EditorSettingsSidebarContentOptionsTabHeader from './header';
import EditorSettingsSidebarContentOptionsTabSidebar from './sidebar';

export default function EditorSettingsSidebarContentOptionsPost() {
  return (
    <Tabs defaultValue="header" className="gap-y-5">
      <TabsList>
        <TabsTrigger value="header" className="cursor-pointer">
          Header
        </TabsTrigger>
        <TabsTrigger value="sidebar" className="cursor-pointer">
          Sidebar
        </TabsTrigger>
      </TabsList>
      <TabsContent value="header">
        <EditorSettingsSidebarContentOptionsTabHeader />
      </TabsContent>
      <TabsContent value="sidebar">
        <EditorSettingsSidebarContentOptionsTabSidebar />
      </TabsContent>
    </Tabs>
  );
}
