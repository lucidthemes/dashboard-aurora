import { z } from 'zod';

import { PageSchema } from '@/schemas/page/page.schema';

export const EditorUpdatePageSchema = PageSchema.omit({ created_at: true, updated_at: true });

export type EditorUpdatePage = z.infer<typeof EditorUpdatePageSchema>;
