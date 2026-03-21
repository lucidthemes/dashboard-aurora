import { createClient } from './client';

const supabase = createClient();

export const getPublicMediaUrl = (path: string) => supabase.storage.from('media').getPublicUrl(path).data.publicUrl;
