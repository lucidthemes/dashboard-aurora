'use server';

import { revalidatePath } from 'next/cache';

export async function deleteRowFromTable(rowId: string, table: string) {
  if (!rowId || !table) return { success: false };

  if (table !== 'media') {
    // const { error } = await supabase.from(table).delete().eq('id', rowId);

    // if (error) return { success: false };

    revalidatePath('/media');

    return { success: true };
  } else {
    // const { data, error: tableError } = await supabase.from('media').delete().eq('id', rowId).select();

    // if (!data || tableError) return { success: false };

    // const storageFolder = data[0].type === 'image' ? 'images' : 'videos';
    // const storagePath = data[0].storage_path;

    // const mediaBucketItem = storageFolder + '/' + storagePath;

    // const { error: storageError } = await supabase.storage.from('media').remove([mediaBucketItem]);

    // if (storageError) return { success: false };

    revalidatePath('/media');

    return { success: true };
  }
}
