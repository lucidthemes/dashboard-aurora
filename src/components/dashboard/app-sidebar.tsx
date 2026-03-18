'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  StickyNote,
  List,
  Tag,
  LayoutList,
  MessageCircleMore,
  Image as ImageIcon,
  ShoppingCart,
  CreditCard,
  Van,
  Percent,
  User,
  Logs,
  Settings,
} from 'lucide-react';

import { useDashboardUser } from '@/app/(dashboard)/user-provider';
import { NavMenuGroup } from '@/components/dashboard/nav-menu-group';
import { Sidebar, SidebarHeader, SidebarContent, SidebarRail } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const data = {
  posts: [
    {
      title: 'Posts',
      url: '/posts',
      icon: StickyNote,
      items: [
        {
          title: 'Categories',
          url: '/posts/categories',
          icon: List,
        },
        {
          title: 'Tags',
          url: '/posts/tags',
          icon: Tag,
        },
        {
          title: 'Comments',
          url: '/posts/comments',
          icon: MessageCircleMore,
        },
      ],
    },
  ],
  shop: [
    {
      title: 'Products',
      url: '/products',
      icon: StickyNote,
      items: [
        {
          title: 'Categories',
          url: '/products/categories',
          icon: List,
        },
        {
          title: 'Tags',
          url: '/products/tags',
          icon: Tag,
        },
        {
          title: 'Attributes',
          url: '/products/attributes',
          icon: LayoutList,
        },
        {
          title: 'Reviews',
          url: '/products/reviews',
          icon: MessageCircleMore,
        },
      ],
    },
    {
      title: 'Orders',
      url: '/orders',
      icon: ShoppingCart,
    },
    {
      title: 'Customers',
      url: '/customers',
      icon: User,
    },
    {
      title: 'Payments',
      url: '/payments',
      icon: CreditCard,
    },
    {
      title: 'Shipping',
      url: '/shipping',
      icon: Van,
    },
    {
      title: 'Coupons',
      url: '/coupons',
      icon: Percent,
    },
  ],
  media: [
    {
      title: 'Media',
      url: '/media',
      icon: ImageIcon,
    },
  ],
  instagram: [
    {
      title: 'Instagram feed',
      url: '/instagram-feed',
      icon: ImageIcon,
    },
  ],
  admin: [
    {
      title: 'Users',
      url: '/users',
      icon: User,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
    },
    {
      title: 'Logs',
      url: '/logs',
      icon: Logs,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const databaseUsed = process.env.NEXT_PUBLIC_DATABASE ?? 'unknown';

  const { role } = useDashboardUser();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="flex h-16 flex-row items-center justify-center gap-x-4 border-b-1">
        <Link href="/">
          <Image src="/aurora.svg" width={100} height={12.5} alt="Aurora" className="h-fit dark:invert" />
        </Link>
        <Separator orientation="vertical" className="max-h-4" />
        <Badge variant="outline" className="capitalize">
          {databaseUsed}
        </Badge>
      </SidebarHeader>
      <SidebarContent className="py-2.5">
        <NavMenuGroup items={data.posts} />
        <NavMenuGroup items={data.shop} />
        <NavMenuGroup items={data.media} />
        <NavMenuGroup items={data.instagram} />
        {role === 'admin' && <NavMenuGroup items={data.admin} />}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
