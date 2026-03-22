'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { createClient } from '@/lib/supabase/client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export default function DashboardHeaderUserLogoutButton() {
  const supabase = createClient();

  const router = useRouter();

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => {
        supabase.auth.signOut();
        router.push('/auth/login');
      }}
    >
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
}
