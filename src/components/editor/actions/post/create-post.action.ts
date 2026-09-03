'use server';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { EditorCreatePostSchema } from '../../schemas/actions/post/create-post.schema';
import type { EditorCreatePost } from '../../schemas/actions/post/create-post.schema';
import { sanitizeContentBlocks } from '../../utils/block-sanitize';

export async function createPost({
  editorData,
}: {
  editorData: EditorCreatePost;
}): Promise<{ success: boolean; errors?: string[] }> {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'CREATE_POST_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  const editorDataParsed = EditorCreatePostSchema.safeParse(editorData);

  if (!editorDataParsed.success) {
    await createLogEvent('error', 'CREATE_POST_INVALID_DATA', 'Create post failed schema validation', user?.id);

    return { success: false };
  }

  const sanitizedBlocks = sanitizeContentBlocks({ blocks: editorData.content });

  const supabase = await createClient();

  const { data: postData, error: postError } = await supabase
    .from('posts')
    .insert({
      title: editorData.title,
      slug: editorData.slug,
      author_id: editorData.author_id,
      media_id: editorData.media_id,
      excerpt: editorData.excerpt,
      content: sanitizedBlocks,
      status: editorData.status,
      options: editorData.options,
    })
    .select()
    .single();

  if (!postData || postError) {
    const errorMessage = postError?.message ?? 'Create post failed';

    await createLogEvent('error', 'CREATE_POST_FAILED', errorMessage, user.id);

    return { success: false };
  }

  let postTaxonomyInsertStatus = true;
  const postTaxonomyInsertErrors: string[] = [];

  if (editorData.categories) {
    const formattedCategories = editorData.categories.map((category) => {
      return { post_id: postData.id, category_id: category };
    });

    const { error: categoriesError } = await supabase.from('posts_categories').insert(formattedCategories);

    if (categoriesError) {
      await createLogEvent('error', 'CREATE_POST_CATEGORIES_FAILED', categoriesError.message, user.id);

      postTaxonomyInsertStatus = false;

      postTaxonomyInsertErrors.push('categories');
    }
  }

  if (editorData.tags) {
    const formattedTags = editorData.tags.map((tag) => {
      return { post_id: postData.id, tag_id: tag };
    });

    const { error: tagsError } = await supabase.from('posts_tags').insert(formattedTags);

    if (tagsError) {
      await createLogEvent('error', 'CREATE_POST_TAGS_FAILED', tagsError.message, user.id);

      postTaxonomyInsertStatus = false;

      postTaxonomyInsertErrors.push('tags');
    }
  }

  if (editorData.related) {
    const formattedRelated = editorData.related.map((related) => {
      return { post_id: postData.id, related_post_id: related };
    });

    const { error: relatedError } = await supabase.from('posts_related_posts').insert(formattedRelated);

    if (relatedError) {
      await createLogEvent('error', 'CREATE_POST_RELATED_POSTS_FAILED', relatedError.message, user.id);

      postTaxonomyInsertStatus = false;

      postTaxonomyInsertErrors.push('related');
    }
  }

  if (postTaxonomyInsertStatus === true) {
    await createLogEvent('info', 'CREATE_POST_SUCCESSFUL', 'Post created. Id: ' + postData.id, user.id);
  }

  return { success: postTaxonomyInsertStatus, errors: postTaxonomyInsertErrors };
}
