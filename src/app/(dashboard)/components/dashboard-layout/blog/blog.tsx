import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import DashboardPageLayoutBlogPosts from './posts';
import DashboardPageLayoutBlogComments from './comments';

export default function DashboardPageLayoutBlog() {
  return (
    <div className="basis-1/2">
      <Card className="flex h-full flex-col">
        <Tabs defaultValue="posts" className="gap-5">
          <CardHeader className="items-center pb-0">
            <CardTitle>Blog</CardTitle>
            <CardDescription>Latest posts or comments</CardDescription>
            <CardAction>
              <TabsList>
                <TabsTrigger value="posts" className="cursor-pointer">
                  Posts
                </TabsTrigger>
                <TabsTrigger value="comments" className="cursor-pointer">
                  Comments
                </TabsTrigger>
              </TabsList>
            </CardAction>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <TabsContent value="posts">
              <DashboardPageLayoutBlogPosts />
            </TabsContent>
            <TabsContent value="comments">
              <DashboardPageLayoutBlogComments />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
