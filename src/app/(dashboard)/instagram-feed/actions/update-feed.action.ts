'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { InstagramFeedFormSchema, InstagramFeedFormImagesSchema } from '@/schemas/instagram-feed.schema';
import type { InstagramFeedForm, InstagramFeedFormImages } from '@/schemas/instagram-feed.schema';

interface UpdateInstagramFeedParams {
  feedId: string;
  formData: InstagramFeedForm;
  formImages: InstagramFeedFormImages[];
}

interface FormImagesInsert {
  instagram_feed_id: string;
  media_id: string;
  position: number;
}

export async function updateInstagramFeed({ feedId, formData, formImages }: UpdateInstagramFeedParams) {
  if (!feedId) return { success: false };

  const formDataParsed = InstagramFeedFormSchema.safeParse(formData);
  const formImagesParsed = z.array(InstagramFeedFormImagesSchema).safeParse(formImages);

  if (!formDataParsed.success || !formImagesParsed.success) return { success: false };

  // const { error: feedError } = await supabase
  //   .from('instagram_feeds')
  //   .update({
  //     name: formData.name,
  //     layout: formData.layout,
  //     button: formData.button,
  //   })
  //   .eq('id', feedId);

  // if (feedError) return { success: false };

  // const { error: mediaDeleteError } = await supabase
  //   .from('instagram_feed_media')
  //   .delete()
  //   .eq('instagram_feed_id', feedId);

  // if (mediaDeleteError) return { success: false };

  // const instagramFeedMediaTableRows: FormImagesInsert[] = formImagesParsed.data.map((image) => ({
  //   instagram_feed_id: feedId,
  //   media_id: image.media.id,
  //   position: image.position,
  // }));

  // const { error: mediaInsertError } = await supabase.from('instagram_feed_media').insert(instagramFeedMediaTableRows);

  // if (mediaInsertError) return { success: false };

  revalidatePath('/instagram-feed');

  return { success: true };
}
