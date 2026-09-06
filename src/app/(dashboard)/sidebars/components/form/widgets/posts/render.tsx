import type { SidebarsFormWidgetPosts } from '../../../../schemas/form/widgets/posts.schema';

export default function SidebarsFormWidgetPostsRender({ id, title }: SidebarsFormWidgetPosts) {
  return (
    <p>
      posts widget! id: {id} title: {title}
    </p>
  );
}
