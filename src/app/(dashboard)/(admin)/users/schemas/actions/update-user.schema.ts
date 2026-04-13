import { z } from 'zod';

export const UsersUpdateUserActionSchema = z.object({
  updateUserId: z.uuid(),
  updateUserRole: z.enum(['customer', 'editor', 'admin']),
});
