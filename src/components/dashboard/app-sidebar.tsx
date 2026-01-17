'use client';

import * as React from 'react';
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

import { NavMenuGroup } from '@/components/dashboard/nav-menu-group';
import { Sidebar, SidebarContent, SidebarRail } from '@/components/ui/sidebar';

const data = {
  posts: [
    {
      title: 'Posts',
      url: '/posts',
      icon: StickyNote,
      isActive: false,
      items: [
        {
          title: 'View all',
          url: '#',
        },
        {
          title: 'Create new',
          url: '#',
        },
      ],
    },
    {
      title: 'Categories',
      url: '/posts/categories',
      icon: List,
      isActive: false,
      items: [
        {
          title: 'View all',
          url: '#',
        },
        {
          title: 'Create new',
          url: '#',
        },
      ],
    },
    {
      title: 'Tags',
      url: '/posts/tags',
      icon: Tag,
      isActive: false,
      items: [
        {
          title: 'View all',
          url: '#',
        },
        {
          title: 'Create new',
          url: '#',
        },
      ],
    },
    {
      title: 'Comments',
      url: '/posts/comments',
      icon: MessageCircleMore,
      isActive: false,
    },
  ],
  products: [
    {
      title: 'Products',
      url: '/products',
      icon: StickyNote,
      isActive: false,
      items: [
        {
          title: 'View all',
          url: '#',
        },
        {
          title: 'Create new',
          url: '#',
        },
      ],
    },
    {
      title: 'Categories',
      url: '/products/categories',
      icon: List,
      isActive: false,
      items: [
        {
          title: 'View all',
          url: '#',
        },
        {
          title: 'Create new',
          url: '#',
        },
      ],
    },
    {
      title: 'Tags',
      url: '/products/tags',
      icon: Tag,
      isActive: false,
      items: [
        {
          title: 'View all',
          url: '#',
        },
        {
          title: 'Create new',
          url: '#',
        },
      ],
    },
    {
      title: 'Attributes',
      url: '/products/attributes',
      icon: LayoutList,
      isActive: false,
      items: [
        {
          title: 'View all',
          url: '#',
        },
        {
          title: 'Create new',
          url: '#',
        },
      ],
    },
    {
      title: 'Reviews',
      url: '/products/reviews',
      icon: MessageCircleMore,
      isActive: false,
    },
  ],
  shop: [
    {
      title: 'Orders',
      url: '/shop/orders',
      icon: ShoppingCart,
      isActive: false,
    },

    {
      title: 'Payments',
      url: '/shop/payments',
      icon: CreditCard,
      isActive: false,
      items: [
        {
          title: 'View all',
          url: '#',
        },
        {
          title: 'Create new',
          url: '#',
        },
      ],
    },
    {
      title: 'Shipping',
      url: '/shop/shipping',
      icon: Van,
      isActive: false,
      items: [
        {
          title: 'View all',
          url: '#',
        },
        {
          title: 'Create new',
          url: '#',
        },
      ],
    },
    {
      title: 'Coupons',
      url: '/shop/coupons',
      icon: Percent,
      isActive: false,
      items: [
        {
          title: 'View all',
          url: '#',
        },
        {
          title: 'Create new',
          url: '#',
        },
      ],
    },
  ],
  media: [
    {
      title: 'Media',
      url: '/media',
      icon: ImageIcon,
      isActive: false,
      items: [
        {
          title: 'Library',
          url: '/media',
        },
        {
          title: 'Upload',
          url: '/media/upload',
        },
      ],
    },
  ],
  instagram: [
    {
      title: 'Instagram feed',
      url: '/instagram-feed',
      icon: ImageIcon,
      isActive: false,
      items: [
        {
          title: 'View all',
          url: '#',
        },
        {
          title: 'Create new',
          url: '#',
        },
      ],
    },
  ],
  admin: [
    {
      title: 'Users',
      url: '/users',
      icon: User,
      isActive: false,
      items: [
        {
          title: 'View all',
          url: '#',
        },
        {
          title: 'Create new',
          url: '#',
        },
      ],
    },
    {
      title: 'Logs',
      url: '/logs',
      icon: Logs,
      isActive: false,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
      isActive: false,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <NavMenuGroup label="Post" items={data.posts} />
        <NavMenuGroup label="Product" items={data.products} />
        <NavMenuGroup label="Shop" items={data.shop} />
        <NavMenuGroup items={data.media} />
        <NavMenuGroup items={data.instagram} />
        <NavMenuGroup items={data.admin} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
