import Link from 'next/link';

import { Button } from '@/components/ui/button';

import getDashboardPageLayoutBlogPosts from './get-posts';
import DashboardPageLayoutBlogPostsListTable from './table';

export default async function DashboardPageLayoutBlogPostsList() {
  const posts = await getDashboardPageLayoutBlogPosts();

  return (
    <div className="flex flex-col gap-5">
      <DashboardPageLayoutBlogPostsListTable postsList={posts} />
      <Button variant="outline">
        <Link href="posts">View all posts</Link>
      </Button>
    </div>
  );
}
