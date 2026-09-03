import { z } from 'zod';

export const EditorSidebarSettingsAuthorsSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

export type EditorSidebarSettingsAuthors = z.infer<typeof EditorSidebarSettingsAuthorsSchema>;
