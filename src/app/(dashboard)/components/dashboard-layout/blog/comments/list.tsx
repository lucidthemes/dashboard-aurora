import Link from 'next/link';

import { Button } from '@/components/ui/button';

import getDashboardPageLayoutBlogComments from './get-comments';
import DashboardPageLayoutBlogCommentsListTable from './table';

export default async function DashboardPageLayoutBlogCommentsList() {
  const comments = await getDashboardPageLayoutBlogComments();

  return (
    <div className="flex flex-col gap-5">
      <DashboardPageLayoutBlogCommentsListTable commentsList={comments} />
      <Button variant="outline">
        <Link href="posts/comments">View all comments</Link>
      </Button>
    </div>
  );
}
