'use client';

import { useEffect } from 'react';
import { TriangleAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { createLogEvent } from '@/lib/supabase/log-event';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    createLogEvent('error', 'DASHBOARD_ERROR_BOUNDARY', 'Dashboard error: ' + error.message);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <TriangleAlert className="h-10 w-10" />
      <h1 className="text-3xl font-medium">Something went wrong</h1>
      <span className="text-sm text-muted-foreground">There was an issue and the page could not be loaded</span>
      <Button className="cursor-pointer" onClick={() => reset()}>
        Reload page
      </Button>
    </div>
  );
}
