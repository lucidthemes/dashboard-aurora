import { z } from 'zod';

export const EditorSidebarSettingsImageSchema = z.object({
  storage_path: z.string(),
  alt_text: z.string().optional().nullable(),
});

export type EditorSidebarSettingsImage = z.infer<typeof EditorSidebarSettingsImageSchema>;
