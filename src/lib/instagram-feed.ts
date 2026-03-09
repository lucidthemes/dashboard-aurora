import { z } from 'zod';

import { InstagramFeedFormImagesSchema, InstagramFeedFormMediaSchema } from '@/schemas/instagram-feed.schema';
import type { InstagramFeedFormImages, InstagramFeedFormMedia } from '@/schemas/instagram-feed.schema';

// use to load feed form selected images
export async function getInstagramFeedFormImages(feedId: string | null): Promise<InstagramFeedFormImages[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!feedId) return [];

  // const { data, error } = await supabase.from('instagram_feed_media').select().eq('instagram_feed_id', feedId);

  // if (error) {
  //   console.log('getInstagramFeedFormImages error: ' + error.message);
  //   return [];
  // }

  const data: InstagramFeedFormImages[] = [
    {
      media: {
        id: '5e793f0c-4f67-4661-ac27-95f86af5247d',
        storage_path: 'instagram-1.jpg',
        alt_text: 'Instagram 1',
      },
      position: 1,
    },
    {
      media: {
        id: '65a55d48-b1e8-456f-b92a-33d22e64fae0',
        storage_path: 'instagram-2.jpg',
        alt_text: 'Instagram 2',
      },
      position: 2,
    },
    {
      media: {
        id: 'd0d8efc2-c11f-4ecc-94a3-d870e606c1f6',
        storage_path: 'instagram-3.jpg',
        alt_text: 'Instagram 3',
      },
      position: 3,
    },
  ];

  const parsed = z.array(InstagramFeedFormImagesSchema).safeParse(data ?? []);

  if (!parsed.success) {
    console.log('getInstagramFeedFormSelectedMedia error: ' + parsed.error.name);
    return [];
  }

  return parsed.data;
}

// use to load feed form media popup
export async function getInstagramFeedFormMedia(page: number): Promise<InstagramFeedFormMedia | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const limit = 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // const { data, count, error } = await supabase.from('media').select('*', { count: 'exact' }).range(from, to);

  // if (error) {
  //   console.log('getInstagramFeedFormMedia error: ' + error.message);
  //   return [];
  // }

  const count = 30;

  const hasMore = count && count > page * limit ? true : false;

  const data: InstagramFeedFormMedia = {
    items: [
      {
        id: '5e793f0c-4f67-4661-ac27-95f86af5247d',
        storage_path: 'instagram-1.jpg',
        alt_text: 'Instagram 1',
      },
      {
        id: '65a55d48-b1e8-456f-b92a-33d22e64fae0',
        storage_path: 'instagram-2.jpg',
        alt_text: 'Instagram 2',
      },
      {
        id: 'd0d8efc2-c11f-4ecc-94a3-d870e606c1f6',
        storage_path: 'instagram-3.jpg',
        alt_text: 'Instagram 3',
      },
      {
        id: '009c6f80-a77e-4be6-9203-8d2908bb2b18',
        storage_path: 'instagram-4.jpg',
        alt_text: 'Instagram 4',
      },
      {
        id: '5c145a39-ce40-43b9-ad66-0ee1927e4b03',
        storage_path: 'instagram-5.jpg',
        alt_text: 'Instagram 5',
      },
      {
        id: '5ec1ca1e-f407-41d6-9a0c-ecaa2f5ca39d',
        storage_path: 'instagram-6.jpg',
        alt_text: 'Instagram 6',
      },
    ],
    hasMore: hasMore,
  };

  const parsed = InstagramFeedFormMediaSchema.safeParse(data);

  if (!parsed.success) {
    console.log('getInstagramFeedFormAllMedia error: ' + parsed.error.name);
    return undefined;
  }

  return parsed.data;
}
