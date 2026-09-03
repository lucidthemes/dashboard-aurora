import { z } from 'zod';

export const EditorSidebarSettingsCategoriesSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

export type EditorSidebarSettingsCategories = z.infer<typeof EditorSidebarSettingsCategoriesSchema>;
