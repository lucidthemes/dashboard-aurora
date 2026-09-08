'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { SidebarsFormSchema } from '../schemas/form/form.schema';
import { SidebarsFormWidgetsSchema } from '../schemas/form/widgets/widgets.schema';
import type { SidebarsForm } from '../schemas/form/form.schema';
import type { SidebarsFormWidgets } from '../schemas/form/widgets/widgets.schema';

export async function createSidebar({
  formData,
  formWidgets,
}: {
  formData: SidebarsForm;
  formWidgets: SidebarsFormWidgets[];
}) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'CREATE_SIDEBAR_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  const formDataParsed = SidebarsFormSchema.safeParse(formData);
  const formWidgetsParsed = z.array(SidebarsFormWidgetsSchema).safeParse(formWidgets);

  if (!formDataParsed.success || !formWidgetsParsed.success) {
    await createLogEvent('error', 'CREATE_SIDEBAR_INVALID_DATA', 'Create sidebar failed schema validation', user?.id);

    return { success: false };
  }

  const supabase = await createClient();

  const { data: createdSidebar, error: sidebarError } = await supabase
    .from('sidebars')
    .insert({
      name: formData.name,
      title: formData.title,
      widgets: formWidgets,
    })
    .select()
    .single();

  if (!createdSidebar || sidebarError) {
    const errorMessage = sidebarError?.message ?? 'Create sidebar failed';

    await createLogEvent('error', 'CREATE_SIDEBAR_FAILED', errorMessage, user.id);

    return { success: false };
  }

  revalidatePath('/sidebars');

  await createLogEvent('info', 'CREATE_SIDEBAR_SUCCESSFUL', 'Sidebar created. Id: ' + createdSidebar.id, user.id);

  return { success: true };
}
