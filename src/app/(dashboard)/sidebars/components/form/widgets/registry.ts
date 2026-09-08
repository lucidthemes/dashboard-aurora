import dynamic from 'next/dynamic';

import type { SidebarsFormWidgetRegistry } from '../../../schemas/form/widgets/widgets.schema';

import { SidebarsFormWidgetAboutCreate } from './about/create';
import { SidebarsFormWidgetInstagramCreate } from './instagram/create';
import { SidebarsFormWidgetNewsletterCreate } from './newsletter/create';
import { SidebarsFormWidgetPostsCreate } from './posts/create';
import { SidebarsFormWidgetProductsCreate } from './products/create';
import { SidebarsFormWidgetPromoBoxCreate } from './promo-box/create';
import { SidebarsFormWidgetSearchCreate } from './search/create';
import { SidebarsFormWidgetSocialCreate } from './social/create';
import { SidebarsFormWidgetTagsCreate } from './tags/create';

export const sidebarsFormWidgetsRegistry: SidebarsFormWidgetRegistry = {
  about: {
    render: dynamic(() => import('./about/render'), {
      ssr: false,
    }),
    create: SidebarsFormWidgetAboutCreate,
  },
  instagram: {
    render: dynamic(() => import('./instagram/render'), {
      ssr: false,
    }),
    create: SidebarsFormWidgetInstagramCreate,
  },
  newsletter: {
    render: dynamic(() => import('./newsletter/render'), {
      ssr: false,
    }),
    create: SidebarsFormWidgetNewsletterCreate,
  },
  posts: {
    render: dynamic(() => import('./posts/render'), {
      ssr: false,
    }),
    create: SidebarsFormWidgetPostsCreate,
  },
  products: {
    render: dynamic(() => import('./products/render'), {
      ssr: false,
    }),
    create: SidebarsFormWidgetProductsCreate,
  },
  promoBox: {
    render: dynamic(() => import('./promo-box/render'), {
      ssr: false,
    }),
    create: SidebarsFormWidgetPromoBoxCreate,
  },
  search: {
    render: dynamic(() => import('./search/render'), {
      ssr: false,
    }),
    create: SidebarsFormWidgetSearchCreate,
  },
  social: {
    render: dynamic(() => import('./social/render'), {
      ssr: false,
    }),
    create: SidebarsFormWidgetSocialCreate,
  },
  tags: {
    render: dynamic(() => import('./tags/render'), {
      ssr: false,
    }),
    create: SidebarsFormWidgetTagsCreate,
  },
};
