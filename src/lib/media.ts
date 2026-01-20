export interface Media {
  id: string;
  type: string;
  storage_path: string;
  alt_text?: string;
  created_at: string;
}

export default async function getMedia(
  type: 'images' | 'videos',
  page: number,
  limit: number,
): Promise<{ media: Media[]; totalCount: number }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const media: Media[] = [];

  const count = 18;

  // const from = (page - 1) * limit;
  // const to = from + limit - 1;

  // const { data, count, error } = await supabase
  //   .from("posts")
  //   .select("*", { count: "exact" })
  //   .range(from, to);

  // if (error) throw error;

  if (type === 'images') {
    media.push(
      {
        id: '1',
        type: 'image',
        storage_path: 'instagram-1.jpg',
        alt_text: 'Instagram 1',
        created_at: '2026-01-04 17:05:50+00',
      },
      {
        id: '2',
        type: 'image',
        storage_path: 'instagram-2.jpg',
        alt_text: 'Instagram 2',
        created_at: '2026-01-04 17:05:50+00',
      },
      {
        id: '3',
        type: 'image',
        storage_path: 'instagram-3.jpg',
        alt_text: 'Instagram 3',
        created_at: '2026-01-04 17:05:50+00',
      },
      {
        id: '4',
        type: 'image',
        storage_path: 'instagram-4.jpg',
        alt_text: 'Instagram 4',
        created_at: '2026-01-04 17:05:50+00',
      },
      {
        id: '5',
        type: 'image',
        storage_path: 'instagram-5.jpg',
        alt_text: 'Instagram 5',
        created_at: '2026-01-04 17:05:50+00',
      },
      {
        id: '6',
        type: 'image',
        storage_path: 'instagram-6.jpg',
        alt_text: 'Instagram 6',
        created_at: '2026-01-04 17:05:50+00',
      },
    );
  }

  return { media: media, totalCount: count };
}
