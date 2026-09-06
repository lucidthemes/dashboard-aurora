import type { ComponentType } from 'react';
import { z } from 'zod';

import { SidebarsFormWidgetAboutSchema } from './about.schema';
import type { SidebarsFormWidgetAbout } from './about.schema';

import { SidebarsFormWidgetInstagramSchema } from './instagram.schema';
import type { SidebarsFormWidgetInstagram } from './instagram.schema';

import { SidebarsFormWidgetNewsletterSchema } from './newsletter.schema';
import type { SidebarsFormWidgetNewsletter } from './newsletter.schema';

import { SidebarsFormWidgetPostsSchema } from './posts.schema';
import type { SidebarsFormWidgetPosts } from './posts.schema';

import { SidebarsFormWidgetProductsSchema } from './products.schema';
import type { SidebarsFormWidgetProducts } from './products.schema';

import { SidebarsFormWidgetPromoBoxSchema } from './promoBox.schema';
import type { SidebarsFormWidgetPromoBox } from './promoBox.schema';

import { SidebarsFormWidgetSearchSchema } from './search.schema';
import type { SidebarsFormWidgetSearch } from './search.schema';

import { SidebarsFormWidgetSocialSchema } from './social.schema';
import type { SidebarsFormWidgetSocial } from './social.schema';

import { SidebarsFormWidgetTagsSchema } from './tags.schema';
import type { SidebarsFormWidgetTags } from './tags.schema';

export const SidebarsFormWidgetsSchema = z.discriminatedUnion('type', [
  SidebarsFormWidgetAboutSchema,
  SidebarsFormWidgetInstagramSchema,
  SidebarsFormWidgetNewsletterSchema,
  SidebarsFormWidgetPostsSchema,
  SidebarsFormWidgetProductsSchema,
  SidebarsFormWidgetPromoBoxSchema,
  SidebarsFormWidgetSearchSchema,
  SidebarsFormWidgetSocialSchema,
  SidebarsFormWidgetTagsSchema,
]);

export type SidebarsFormWidgets = z.infer<typeof SidebarsFormWidgetsSchema>;

// Registry

type SidebarsFormWidgetTypes = SidebarsFormWidgets['type'];

type SidebarsFormWidgetRegistryRenderMap = {
  about: ComponentType<SidebarsFormWidgetAbout>;
  instagram: ComponentType<SidebarsFormWidgetInstagram>;
  newsletter: ComponentType<SidebarsFormWidgetNewsletter>;
  posts: ComponentType<SidebarsFormWidgetPosts>;
  products: ComponentType<SidebarsFormWidgetProducts>;
  promoBox: ComponentType<SidebarsFormWidgetPromoBox>;
  search: ComponentType<SidebarsFormWidgetSearch>;
  social: ComponentType<SidebarsFormWidgetSocial>;
  tags: ComponentType<SidebarsFormWidgetTags>;
};

export type SidebarsFormWidgetRegistry = {
  [K in SidebarsFormWidgetTypes]: {
    render: SidebarsFormWidgetRegistryRenderMap[K];
    create: () => Extract<SidebarsFormWidgets, { type: K }>;
  };
};
