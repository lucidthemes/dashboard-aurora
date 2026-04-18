import { z } from 'zod';

export const EditorSidebarSettingsOptionsSidebarsSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  title: z.string(),
});

export type EditorSidebarSettingsOptionsSidebars = z.infer<typeof EditorSidebarSettingsOptionsSidebarsSchema>;
