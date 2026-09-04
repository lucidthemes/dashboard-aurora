import { z } from 'zod';

import { PageSchema } from '@/schemas/page/page.schema';

export const EditorCreatePageSchema = PageSchema.omit({ id: true, created_at: true, updated_at: true });

export type EditorCreatePage = z.infer<typeof EditorCreatePageSchema>;
