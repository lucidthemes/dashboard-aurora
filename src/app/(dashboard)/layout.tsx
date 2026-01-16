import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import MainHeader from '@/components/dashboard/main-header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <MainHeader />
        <div className="p-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
