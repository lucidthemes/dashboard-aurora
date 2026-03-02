import { createClient } from '../supabase/client';

const supabase = createClient();

export const getPublicMediaImageUrl = (path: string) =>
  supabase.storage.from('media/images').getPublicUrl(path).data.publicUrl;

export const getPublicMediaVideoUrl = (path: string) =>
  supabase.storage.from('media/videos').getPublicUrl(path).data.publicUrl;
