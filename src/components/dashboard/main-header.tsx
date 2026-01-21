import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { MainHeaderModeSwitcher } from './main-header-mode-switcher';
import { MainHeaderUser } from './main-header-user';

const data = {
  user: {
    name: 'Lucid Themes',
    email: 'you@example.com',
    //avatar: '/avatars/shadcn.jpg',
  },
};

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-1 flex h-16 shrink-0 items-center justify-between gap-2 border-b-1 bg-background px-5 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Posts</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-x-2">
        <MainHeaderModeSwitcher />
        <Separator orientation="vertical" className="ml-2 data-[orientation=vertical]:h-4" />
        <MainHeaderUser user={data.user} />
      </div>
    </header>
  );
}
