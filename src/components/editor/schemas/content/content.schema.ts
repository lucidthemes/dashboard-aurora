import { z } from 'zod';

import { ContentBlocksSchema } from './content-blocks.schema';

export const EditorContentSchema = z.array(ContentBlocksSchema);

export type EditorContent = z.infer<typeof EditorContentSchema>;
