'use client';

import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone';
import { useSupabaseUpload } from '@/hooks/use-supabase-upload';

export default function MediaUploadForm({ uploadType }: { uploadType: 'image' | 'video' | null }) {
  const supabaseUploadPath = uploadType === 'image' ? 'images' : 'videos';
  const supabaseUploadAllowedMimeTypes = uploadType === 'image' ? 'image/*' : 'video/*';

  const props = useSupabaseUpload({
    bucketName: 'media',
    path: supabaseUploadPath,
    allowedMimeTypes: [supabaseUploadAllowedMimeTypes],
    maxFiles: 2,
    maxFileSize: 1000 * 1000 * 10, // 10MB,
  });

  return (
    <div className="h-full w-full">
      <Dropzone {...props} className="h-full">
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    </div>
  );
}
