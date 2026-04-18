'use server';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { EditorUpdatePostSchema } from '../../schemas/actions/post/update-post.schema';
import type { EditorUpdatePost } from '../../schemas/actions/post/update-post.schema';
import { sanitizeContentBlocks } from '../../utils/block-sanitize';

export async function updatePost({
  editorData,
}: {
  editorData: EditorUpdatePost;
}): Promise<{ success: boolean; errors?: string[] }> {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'UPDATE_POST_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  const editorDataParsed = EditorUpdatePostSchema.safeParse(editorData);

  if (!editorDataParsed.success) {
    await createLogEvent('error', 'UPDATE_POST_INVALID_DATA', 'Update post failed schema validation', user?.id);

    return { success: false };
  }

  const sanitizedBlocks = sanitizeContentBlocks({ blocks: editorData.content });

  const supabase = await createClient();

  const { data: postData, error: postError } = await supabase
    .from('posts')
    .update({
      title: editorData.title,
      slug: editorData.slug,
      author_id: editorData.author_id,
      media_id: editorData.media_id,
      excerpt: editorData.excerpt,
      content: sanitizedBlocks,
      status: editorData.status,
      options: editorData.options,
    })
    .eq('id', editorData.id)
    .select()
    .single();

  if (!postData || postError) {
    const errorMessage = postError?.message ?? 'Update post failed';

    await createLogEvent('error', 'UPDATE_POST_FAILED', errorMessage, user.id);

    return { success: false };
  }

  let postTaxonomyInsertStatus = true;
  const postTaxonomyInsertErrors: string[] = [];

  if (editorData.categories) {
    const { error: categoriesDeleteError } = await supabase
      .from('posts_categories')
      .delete()
      .eq('post_id', postData.id);

    if (!categoriesDeleteError) {
      const formattedCategories = editorData.categories.map((category) => {
        return { post_id: postData.id, category_id: category };
      });

      const { error: categoriesInsertError } = await supabase.from('posts_categories').insert(formattedCategories);

      if (categoriesInsertError) {
        await createLogEvent('error', 'UPDATE_POST_CATEGORIES_FAILED', categoriesInsertError.message, user.id);

        postTaxonomyInsertStatus = false;

        postTaxonomyInsertErrors.push('categories');
      }
    } else {
      await createLogEvent('error', 'UPDATE_POST_DELETE_CATEGORIES_FAILED', categoriesDeleteError.message, user.id);

      postTaxonomyInsertStatus = false;

      postTaxonomyInsertErrors.push('categories');
    }
  }

  if (editorData.tags) {
    const { error: tagsDeleteError } = await supabase.from('posts_tags').delete().eq('post_id', postData.id);

    if (!tagsDeleteError) {
      const formattedTags = editorData.tags.map((tag) => {
        return { post_id: postData.id, tag_id: tag };
      });

      const { error: tagsInsertError } = await supabase.from('posts_tags').insert(formattedTags);

      if (tagsInsertError) {
        await createLogEvent('error', 'UPDATE_POST_TAGS_FAILED', tagsInsertError.message, user.id);

        postTaxonomyInsertStatus = false;

        postTaxonomyInsertErrors.push('tags');
      }
    } else {
      await createLogEvent('error', 'UPDATE_POST_DELETE_TAGS_FAILED', tagsDeleteError.message, user.id);

      postTaxonomyInsertStatus = false;

      postTaxonomyInsertErrors.push('tags');
    }
  }

  if (editorData.related) {
    const { error: relatedDeleteError } = await supabase
      .from('posts_related_posts')
      .delete()
      .eq('post_id', postData.id);

    if (!relatedDeleteError) {
      const formattedRelated = editorData.related.map((related) => {
        return { post_id: postData.id, related_post_id: related };
      });

      const { error: relatedInsertError } = await supabase.from('posts_related_posts').insert(formattedRelated);

      if (relatedInsertError) {
        await createLogEvent('error', 'UPDATE_POST_RELATED_POSTS_FAILED', relatedInsertError.message, user.id);

        postTaxonomyInsertStatus = false;

        postTaxonomyInsertErrors.push('related');
      }
    } else {
      await createLogEvent('error', 'UPDATE_POST_DELETE_RELATED_POSTS_FAILED', relatedDeleteError.message, user.id);

      postTaxonomyInsertStatus = false;

      postTaxonomyInsertErrors.push('related');
    }
  }

  return { success: postTaxonomyInsertStatus, errors: postTaxonomyInsertErrors };
}
