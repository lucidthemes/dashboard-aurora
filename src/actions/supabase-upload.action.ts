'use server';

import type { FileError } from 'react-dropzone';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

interface FileWithPreview extends File {
  preview?: string;
  errors: readonly FileError[];
}

export async function supabaseDropzoneFileUpload({
  bucketName,
  path,
  file,
  cacheControl,
  upsert,
}: {
  bucketName: string;
  path?: string;
  file: FileWithPreview;
  cacheControl: number;
  upsert: boolean;
}) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent(
      'error',
      'UPLOAD_MEDIA_UNAUTHORIZED',
      'Unauthorized user. Media file name:' + file.name,
      user?.id,
    );

    return { name: file.name, message: 'Unauthorized user' };
  }

  const supabase = await createClient();

  const { error } = await supabase.storage.from(bucketName).upload(!!path ? `${path}/${file.name}` : file.name, file, {
    cacheControl: cacheControl.toString(),
    upsert,
  });

  if (error) {
    await createLogEvent('error', 'UPLOAD_MEDIA_FAILED', error.message + '. Media file name: ' + file.name, user.id);

    return { name: file.name, message: error.message };
  } else {
    await createLogEvent('info', 'UPLOAD_MEDIA_SUCCESSFUL', 'Media uploaded. File name: ' + file.name, user.id);

    return { name: file.name, message: undefined };
  }
}
