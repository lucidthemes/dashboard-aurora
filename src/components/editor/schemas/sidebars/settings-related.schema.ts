import { z } from 'zod';

export const EditorSidebarSettingsRelatedSchema = z.object({
  id: z.uuid(),
  title: z.string(),
});

export type EditorSidebarSettingsRelated = z.infer<typeof EditorSidebarSettingsRelatedSchema>;
