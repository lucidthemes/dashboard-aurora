'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { PostSchema } from '@/schemas/post/post.schema';
import type { Post } from '@/schemas/post/post.schema';
import { ContentBlocksSchema } from '@/components/editor/schemas/content/content-blocks.schema';

export default async function getPost(postId: string): Promise<Post | null> {
  if (!postId) return null;

  const supabase = await createClient();

  const query = supabase
    .from('posts')
    .select(
      `
        id,
        title,
        slug,
        author_id,
        media_id,
        excerpt,
        content,
        categories:posts_categories (
          category:post_categories  (
            id
          )
        ),
        tags:posts_tags (
          tag:post_tags (
            id
          )
        ),
        related:posts_related_posts!post_id (
          post:posts!related_post_id (
            id
          )
        ),
        status,
        created_at,
        updated_at,
        options
    `,
    )
    .eq('id', postId)
    .maybeSingle()
    .overrideTypes<{
      categories: {
        category: {
          id: string;
        };
      }[];
      tags: {
        tag: {
          id: string;
        };
      }[];
      related: {
        post: {
          id: string;
        };
      }[];
    }>();

  const { data, error } = await query;

  if (error) {
    await createLogEvent('error', 'FETCH_POST_FAILED', error.message);

    return null;
  }

  if (!data) {
    await createLogEvent('error', 'FETCH_POST_NOT_FOUND', 'Post not found. Id: ' + postId);

    return null;
  }

  const normalized: Post = {
    ...data,
    content: [],
    categories: data.categories.map((c) => c.category.id),
    tags: data.tags.map((t) => t.tag.id),
    related: data.related.map((r) => r.post.id),
  };

  const parsedPost = PostSchema.safeParse(normalized);

  if (!parsedPost.success) {
    await createLogEvent('error', 'FETCH_POST_INVALID_DATA', 'Fetch post failed schema validation');

    return null;
  }

  const postContent = data.content;
  const parsedContent = z.array(ContentBlocksSchema).safeParse(postContent ?? []);

  // parse content separate to post so that if an attribute has changed for a block and that isn't saved in DB,
  // it doesn't cause the whole post to fail schema validation and redirect back to posts page
  if (!parsedContent.success) {
    await createLogEvent('error', 'FETCH_POST_CONTENT_INVALID_DATA', 'Fetch post content failed schema validation');
  }

  // create new return object using normalized data that has passed schema validation
  // and add in the post content
  const returnPostData = {
    ...normalized,
    content: postContent,
  };

  return returnPostData;
}
