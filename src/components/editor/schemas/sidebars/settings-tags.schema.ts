import { z } from 'zod';

export const EditorSidebarSettingsTagsSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

export type EditorSidebarSettingsTags = z.infer<typeof EditorSidebarSettingsTagsSchema>;
