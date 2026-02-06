import { z } from 'zod';

import { MediaSchema } from '@/schemas/media.schema';
import type { Media } from '@/schemas/media.schema';

export default async function getMedia(
  type: 'images' | 'videos',
  page: number,
  limit: number,
): Promise<{ media: Media[]; totalCount: number }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data: Media[] = [];

  const count = 18;

  // const from = (page - 1) * limit;
  // const to = from + limit - 1;

  // const { data, count, error } = await supabase
  //   .from("posts")
  //   .select("*", { count: "exact" })
  //   .range(from, to);

  // if (error) throw error;

  if (type === 'images') {
    data.push(
      {
        id: '5e793f0c-4f67-4661-ac27-95f86af5247d',
        type: 'image',
        storage_path: 'instagram-1.jpg',
        alt_text: 'Instagram 1',
        created_at: new Date('2026-01-04 17:05:50+00'),
      },
      {
        id: '65a55d48-b1e8-456f-b92a-33d22e64fae0',
        type: 'image',
        storage_path: 'instagram-2.jpg',
        alt_text: 'Instagram 2',
        created_at: new Date('2026-01-04 17:05:50+00'),
      },
      {
        id: 'd0d8efc2-c11f-4ecc-94a3-d870e606c1f6',
        type: 'image',
        storage_path: 'instagram-3.jpg',
        alt_text: 'Instagram 3',
        created_at: new Date('2026-01-04 17:05:50+00'),
      },
      {
        id: '009c6f80-a77e-4be6-9203-8d2908bb2b18',
        type: 'image',
        storage_path: 'instagram-4.jpg',
        alt_text: 'Instagram 4',
        created_at: new Date('2026-01-04 17:05:50+00'),
      },
      {
        id: '5c145a39-ce40-43b9-ad66-0ee1927e4b03',
        type: 'image',
        storage_path: 'instagram-5.jpg',
        alt_text: 'Instagram 5',
        created_at: new Date('2026-01-04 17:05:50+00'),
      },
      {
        id: '5ec1ca1e-f407-41d6-9a0c-ecaa2f5ca39d',
        type: 'image',
        storage_path: 'instagram-6.jpg',
        alt_text: 'Instagram 6',
        created_at: new Date('2026-01-04 17:05:50+00'),
      },
    );
  }

  const parsed = z.array(MediaSchema).safeParse(data ?? []);

  if (!parsed.success) {
    console.log('getMedia error: ' + parsed.error.name);
    return { media: [], totalCount: 0 };
  }

  return { media: parsed.data, totalCount: count };
}
