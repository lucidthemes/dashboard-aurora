'use client';

import {
  StickyNote,
  Pin,
  Plus,
  List,
  Tag,
  LayoutList,
  MessageCircleMore,
  Signature,
  Store,
  ShoppingCart,
  CreditCard,
  Van,
  Percent,
  Image,
  Camera,
  User,
  Logs,
  Settings,
} from 'lucide-react';

import { useDashboardUser } from '@/app/(dashboard)/user-provider';
import { SidebarContent } from '@/components/ui/sidebar';

import { DashboardSidebarNavMenuGroup } from './nav-menu-group';

const data = {
  pages: [
    {
      title: 'Pages',
      url: '/pages',
      icon: StickyNote,
    },
  ],
  posts: [
    {
      title: 'Posts',
      url: '/posts',
      icon: Pin,
      items: [
        {
          title: 'Add post',
          url: '/post?action=create',
          icon: Plus,
        },
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
        {
          title: 'Authors',
          url: '/posts/authors',
          icon: Signature,
        },
      ],
    },
  ],
  shop: [
    {
      title: 'Products',
      url: '/products',
      icon: Store,
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
      icon: Image,
    },
  ],
  instagram: [
    {
      title: 'Instagram feed',
      url: '/instagram-feed',
      icon: Camera,
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

export default function DashboardSidebarContent() {
  const { role } = useDashboardUser();

  return (
    <SidebarContent className="py-2.5">
      <DashboardSidebarNavMenuGroup items={data.pages} />
      <DashboardSidebarNavMenuGroup items={data.posts} />
      <DashboardSidebarNavMenuGroup items={data.shop} />
      <DashboardSidebarNavMenuGroup items={data.media} />
      <DashboardSidebarNavMenuGroup items={data.instagram} />
      {role === 'admin' && <DashboardSidebarNavMenuGroup items={data.admin} />}
    </SidebarContent>
  );
}
