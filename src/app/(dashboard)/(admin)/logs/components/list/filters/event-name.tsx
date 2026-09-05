import ListFilter from '@/components/list/filters';

export default function LogsListFiltersEventName() {
  const filterOptions = [
    {
      id: 1,
      section: 'Auth',
      items: [
        {
          id: 1,
          value: 'SIGN_UP_INVALID_DATA',
          label: 'SIGN_UP_INVALID_DATA',
        },
        {
          id: 2,
          value: 'SIGN_UP_FAILED',
          label: 'SIGN_UP_FAILED',
        },
        {
          id: 3,
          value: 'SIGN_UP_NO_USER',
          label: 'SIGN_UP_NO_USER',
        },
        {
          id: 4,
          value: 'SIGN_UP_SUCCESSFUL',
          label: 'SIGN_UP_SUCCESSFUL',
        },
        {
          id: 5,
          value: 'SIGN_IN_INVALID_DATA',
          label: 'SIGN_IN_INVALID_DATA',
        },
        {
          id: 6,
          value: 'SIGN_IN_FAILED',
          label: 'SIGN_IN_FAILED',
        },
        {
          id: 7,
          value: 'SIGN_IN_NO_USER',
          label: 'SIGN_IN_NO_USER',
        },
        {
          id: 8,
          value: 'SIGN_IN_SUCCESSFUL',
          label: 'SIGN_IN_SUCCESSFUL',
        },
        {
          id: 9,
          value: 'LOST_PASSWORD_INVALID_DATA',
          label: 'LOST_PASSWORD_INVALID_DATA',
        },
        {
          id: 10,
          value: 'LOST_PASSWORD_FAILED',
          label: 'LOST_PASSWORD_FAILED',
        },
        {
          id: 11,
          value: 'LOST_PASSWORD_SUCCESSFUL',
          label: 'LOST_PASSWORD_SUCCESSFUL',
        },
        {
          id: 12,
          value: 'RESET_PASSWORD_INVALID_DATA',
          label: 'RESET_PASSWORD_INVALID_DATA',
        },
        {
          id: 13,
          value: 'RESET_PASSWORD_FAILED',
          label: 'RESET_PASSWORD_FAILED',
        },
        {
          id: 14,
          value: 'RESET_PASSWORD_NO_USER',
          label: 'RESET_PASSWORD_NO_USER',
        },
        {
          id: 15,
          value: 'RESET_PASSWORD_SUCCESSFUL',
          label: 'RESET_PASSWORD_SUCCESSFUL',
        },
      ],
    },
    {
      id: 2,
      section: 'Frontend - account',
      items: [
        {
          id: 1,
          value: 'UPDATE_SHIPPING_INVALID_DATA',
          label: 'UPDATE_SHIPPING_INVALID_DATA',
        },
        {
          id: 2,
          value: 'UPDATE_BILLING_INVALID_DATA',
          label: 'UPDATE_BILLING_INVALID_DATA',
        },
        {
          id: 3,
          value: 'UPDATE_SHIPPING_ADDRESS_FAILED',
          label: 'UPDATE_SHIPPING_ADDRESS_FAILED',
        },
        {
          id: 4,
          value: 'UPDATE_BILLING_ADDRESS_FAILED',
          label: 'UPDATE_BILLING_ADDRESS_FAILED',
        },
        {
          id: 5,
          value: 'UPDATE_SHIPPING_ADDRESS_SUCCESSFUL',
          label: 'UPDATE_SHIPPING_ADDRESS_SUCCESSFUL',
        },
        {
          id: 6,
          value: 'UPDATE_BILLING_ADDRESS_SUCCESSFUL',
          label: 'UPDATE_BILLING_ADDRESS_SUCCESSFUL',
        },
        {
          id: 7,
          value: 'UPDATE_EMAIL_INVALID_DATA',
          label: 'UPDATE_EMAIL_INVALID_DATA',
        },
        {
          id: 8,
          value: 'UPDATE_EMAIL_FAILED',
          label: 'UPDATE_EMAIL_FAILED',
        },
        {
          id: 9,
          value: 'UPDATE_EMAIL_SUCCESSFUL',
          label: 'UPDATE_EMAIL_SUCCESSFUL',
        },
        {
          id: 10,
          value: 'UPDATE_NAME_INVALID_DATA',
          label: 'UPDATE_NAME_INVALID_DATA',
        },
        {
          id: 11,
          value: 'UPDATE_NAME_FAILED',
          label: 'UPDATE_NAME_FAILED',
        },
        {
          id: 12,
          value: 'UPDATE_NAME_SUCCESSFUL',
          label: 'UPDATE_NAME_SUCCESSFUL',
        },
        {
          id: 13,
          value: 'UPDATE_PASSWORD_INVALID_DATA',
          label: 'UPDATE_PASSWORD_INVALID_DATA',
        },
        {
          id: 14,
          value: 'UPDATE_PASSWORD_CURRENT_INCORRECT',
          label: 'UPDATE_PASSWORD_CURRENT_INCORRECT',
        },
        {
          id: 15,
          value: 'UPDATE_PASSWORD_FAILED',
          label: 'UPDATE_PASSWORD_FAILED',
        },
        {
          id: 16,
          value: 'UPDATE_PASSWORD_SUCCESSFUL',
          label: 'UPDATE_PASSWORD_SUCCESSFUL',
        },
      ],
    },
    {
      id: 3,
      section: 'Frontend - Blog - Blog list',
      items: [
        {
          id: 1,
          value: 'FETCH_BLOG_LIST_POSTS_TAXONOMY_FAILED',
          label: 'FETCH_BLOG_LIST_POSTS_TAXONOMY_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_BLOG_LIST_POSTS_FAILED',
          label: 'FETCH_BLOG_LIST_POSTS_FAILED',
        },
        {
          id: 3,
          value: 'FETCH_BLOG_LIST_POSTS_INVALID_DATA',
          label: 'FETCH_BLOG_LIST_POSTS_INVALID_DATA',
        },
        {
          id: 4,
          value: 'FETCH_BLOG_LIST_TAXONOMY_FAILED',
          label: 'FETCH_BLOG_LIST_TAXONOMY_FAILED',
        },
        {
          id: 5,
          value: 'FETCH_BLOG_LIST_TAXONOMY_NOT_FOUND',
          label: 'FETCH_BLOG_LIST_TAXONOMY_NOT_FOUND',
        },
        {
          id: 6,
          value: 'FETCH_BLOG_LIST_TAXONOMY_INVALID_DATA',
          label: 'FETCH_BLOG_LIST_TAXONOMY_INVALID_DATA',
        },
      ],
    },
    {
      id: 4,
      section: 'Frontend - Blog - Blog post',
      items: [
        {
          id: 1,
          value: 'FETCH_POST_FAILED',
          label: 'FETCH_POST_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_POST_INVALID_DATA',
          label: 'FETCH_POST_INVALID_DATA',
        },
      ],
    },
    {
      id: 5,
      section: 'Frontend - Instagram feed',
      items: [
        {
          id: 1,
          value: 'FETCH_FEED_SETTINGS_FAILED',
          label: 'FETCH_FEED_SETTINGS_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_FEED_NOT_FOUND',
          label: 'FETCH_FEED_NOT_FOUND',
        },
        {
          id: 3,
          value: 'FETCH_FEED_INVALID_DATA',
          label: 'FETCH_FEED_INVALID_DATA',
        },
        {
          id: 4,
          value: 'FETCH_FEED_MEDIA_FAILED',
          label: 'FETCH_FEED_MEDIA_FAILED',
        },
        {
          id: 5,
          value: 'FETCH_FEED_INVALID_DATA',
          label: 'FETCH_FEED_INVALID_DATA',
        },
      ],
    },
    {
      id: 6,
      section: 'Frontend - Home - Banner',
      items: [
        {
          id: 1,
          value: 'FETCH_BANNER_FAILED',
          label: 'FETCH_BANNER_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_BANNER_INVALID_DATA',
          label: 'FETCH_BANNER_INVALID_DATA',
        },
      ],
    },
    {
      id: 7,
      section: 'Frontend - Home - Slideshow',
      items: [
        {
          id: 1,
          value: 'FETCH_SLIDESHOW_TAXONOMY_FAILED',
          label: 'FETCH_SLIDESHOW_TAXONOMY_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_SLIDESHOW_FAILED',
          label: 'FETCH_SLIDESHOW_FAILED',
        },
        {
          id: 3,
          value: 'FETCH_SLIDESHOW_INVALID_DATA',
          label: 'FETCH_SLIDESHOW_INVALID_DATA',
        },
      ],
    },
    {
      id: 8,
      section: 'Frontend - Newsletter form',
      items: [
        {
          id: 1,
          value: 'CREATE_NEWSLETTER_INVALID_DATA',
          label: 'CREATE_NEWSLETTER_INVALID_DATA',
        },
        {
          id: 2,
          value: 'CREATE_NEWSLETTER_SUBSCRIBER_FAILED',
          label: 'CREATE_NEWSLETTER_SUBSCRIBER_FAILED',
        },
        {
          id: 3,
          value: 'CREATE_NEWSLETTER_SUBSCRIBER_SUCCESSFUL',
          label: 'CREATE_NEWSLETTER_SUBSCRIBER_SUCCESSFUL',
        },
      ],
    },
    {
      id: 9,
      section: 'Frontend - Page',
      items: [
        {
          id: 1,
          value: 'FETCH_PAGE_FAILED',
          label: 'FETCH_PAGE_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_PAGE_INVALID_DATA',
          label: 'FETCH_PAGE_INVALID_DATA',
        },
      ],
    },
    {
      id: 10,
      section: 'Frontend - Sidebar',
      items: [
        {
          id: 1,
          value: 'FETCH_SIDEBAR_FAILED',
          label: 'FETCH_SIDEBAR_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_SIDEBAR_INVALID_DATA',
          label: 'FETCH_SIDEBAR_INVALID_DATA',
        },
      ],
    },
    {
      id: 11,
      section: 'Frontend - Widgets - Posts',
      items: [
        {
          id: 1,
          value: 'FETCH_POSTS_WIDGET_FAILED',
          label: 'FETCH_POSTS_WIDGET_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_POSTS_WIDGET_INVALID_DATA',
          label: 'FETCH_POSTS_WIDGET_INVALID_DATA',
        },
      ],
    },
    {
      id: 12,
      section: 'Frontend - Widgets - Tags',
      items: [
        {
          id: 1,
          value: 'FETCH_TAGS_WIDGET_FAILED',
          label: 'FETCH_TAGS_WIDGET_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_TAGS_WIDGET_INVALID_DATA',
          label: 'FETCH_TAGS_WIDGET_INVALID_DATA',
        },
      ],
    },
    {
      id: 13,
      section: 'Dashboard - Pages',
      items: [
        {
          id: 1,
          value: 'FETCH_PAGES_FAILED',
          label: 'FETCH_PAGES_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_PAGES_INVALID_DATA',
          label: 'FETCH_PAGES_INVALID_DATA',
        },
        {
          id: 9,
          value: 'DUPLICATE_PAGE_UNAUTHORIZED',
          label: 'DUPLICATE_PAGE_UNAUTHORIZED',
        },
        {
          id: 10,
          value: 'DUPLICATE_PAGE_NO_PAGE_ID',
          label: 'DUPLICATE_PAGE_NO_PAGE_ID',
        },
        {
          id: 11,
          value: 'DUPLICATE_PAGE_INVALID_DATA',
          label: 'DUPLICATE_PAGE_INVALID_DATA',
        },
        {
          id: 12,
          value: 'DUPLICATE_PAGE_FETCH_FAILED',
          label: 'DUPLICATE_PAGE_FETCH_FAILED',
        },
        {
          id: 13,
          value: 'DUPLICATE_PAGE_NOT_FOUND',
          label: 'DUPLICATE_PAGE_NOT_FOUND',
        },
        {
          id: 14,
          value: 'DUPLICATE_PAGE_INSERT_FAILED',
          label: 'DUPLICATE_PAGE_INSERT_FAILED',
        },
        {
          id: 15,
          value: 'DELETE_PAGE_FAILED',
          label: 'DELETE_PAGE_FAILED',
        },
        {
          id: 16,
          value: 'DELETE_PAGE_SUCCESSFUL',
          label: 'DELETE_PAGE_SUCCESSFUL',
        },
      ],
    },
    {
      id: 14,
      section: 'Dashboard - Posts',
      items: [
        {
          id: 1,
          value: 'FETCH_POSTS_FAILED',
          label: 'FETCH_POSTS_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_POSTS_INVALID_DATA',
          label: 'FETCH_POSTS_INVALID_DATA',
        },
        {
          id: 3,
          value: 'FETCH_POSTS_FILTER_AUTHOR_FAILED',
          label: 'FETCH_POSTS_FILTER_AUTHOR_FAILED',
        },
        {
          id: 4,
          value: 'FETCH_POSTS_FILTER_AUTHOR_INVALID_DATA',
          label: 'FETCH_POSTS_FILTER_AUTHOR_INVALID_DATA',
        },
        {
          id: 5,
          value: 'FETCH_POSTS_FILTER_CATEGORY_FAILED',
          label: 'FETCH_POSTS_FILTER_CATEGORY_FAILED',
        },
        {
          id: 6,
          value: 'FETCH_POSTS_FILTER_CATEGORY_INVALID_DATA',
          label: 'FETCH_POSTS_FILTER_CATEGORY_INVALID_DATA',
        },
        {
          id: 7,
          value: 'FETCH_POSTS_FILTER_TAG_FAILED',
          label: 'FETCH_POSTS_FILTER_TAG_FAILED',
        },
        {
          id: 8,
          value: 'FETCH_POSTS_FILTER_TAG_INVALID_DATA',
          label: 'FETCH_POSTS_FILTER_TAG_INVALID_DATA',
        },
        {
          id: 9,
          value: 'DUPLICATE_POST_UNAUTHORIZED',
          label: 'DUPLICATE_POST_UNAUTHORIZED',
        },
        {
          id: 10,
          value: 'DUPLICATE_POST_NO_POST_ID',
          label: 'DUPLICATE_POST_NO_POST_ID',
        },
        {
          id: 11,
          value: 'DUPLICATE_POST_INVALID_DATA',
          label: 'DUPLICATE_POST_INVALID_DATA',
        },
        {
          id: 12,
          value: 'DUPLICATE_POST_FETCH_FAILED',
          label: 'DUPLICATE_POST_FETCH_FAILED',
        },
        {
          id: 13,
          value: 'DUPLICATE_POST_NOT_FOUND',
          label: 'DUPLICATE_POST_NOT_FOUND',
        },
        {
          id: 14,
          value: 'DUPLICATE_POST_INSERT_FAILED',
          label: 'DUPLICATE_POST_INSERT_FAILED',
        },
        {
          id: 15,
          value: 'DELETE_POST_FAILED',
          label: 'DELETE_POST_FAILED',
        },
        {
          id: 16,
          value: 'DELETE_POST_SUCCESSFUL',
          label: 'DELETE_POST_SUCCESSFUL',
        },
      ],
    },
    {
      id: 15,
      section: 'Dashboard - Posts - Categories',
      items: [
        {
          id: 1,
          value: 'FETCH_POSTS_CATEGORIES_FAILED',
          label: 'FETCH_POSTS_CATEGORIES_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_POSTS_CATEGORIES_INVALID_DATA',
          label: 'FETCH_POSTS_CATEGORIES_INVALID_DATA',
        },
        {
          id: 3,
          value: 'CREATE_POST_CATEGORY_UNAUTHORIZED',
          label: 'CREATE_POST_CATEGORY_UNAUTHORIZED',
        },
        {
          id: 4,
          value: 'CREATE_POST_CATEGORY_INVALID_DATA',
          label: 'CREATE_POST_CATEGORY_INVALID_DATA',
        },
        {
          id: 5,
          value: 'CREATE_POST_CATEGORY_INVALID_DATA',
          label: 'CREATE_POST_CATEGORY_INVALID_DATA',
        },
        {
          id: 6,
          value: 'CREATE_POST_CATEGORY_FAILED',
          label: 'CREATE_POST_CATEGORY_FAILED',
        },
        {
          id: 7,
          value: 'CREATE_POST_CATEGORY_SUCCESSFUL',
          label: 'CREATE_POST_CATEGORY_SUCCESSFUL',
        },
        {
          id: 8,
          value: 'EDIT_POST_CATEGORY_UNAUTHORIZED',
          label: 'EDIT_POST_CATEGORY_UNAUTHORIZED',
        },
        {
          id: 9,
          value: 'EDIT_POST_CATEGORY_INVALID_DATA',
          label: 'EDIT_POST_CATEGORY_INVALID_DATA',
        },
        {
          id: 10,
          value: 'EDIT_POST_CATEGORY_INVALID_DATA',
          label: 'EDIT_POST_CATEGORY_INVALID_DATA',
        },
        {
          id: 11,
          value: 'EDIT_POST_CATEGORY_FAILED',
          label: 'EDIT_POST_CATEGORY_FAILED',
        },
        {
          id: 12,
          value: 'EDIT_POST_CATEGORY_SUCCESSFUL',
          label: 'EDIT_POST_CATEGORY_SUCCESSFUL',
        },
        {
          id: 13,
          value: 'DELETE_POST_CATEGORY_FAILED',
          label: 'DELETE_POST_CATEGORY_FAILED',
        },
        {
          id: 14,
          value: 'DELETE_POST_CATEGORY_SUCCESSFUL',
          label: 'DELETE_POST_CATEGORY_SUCCESSFUL',
        },
      ],
    },
    {
      id: 16,
      section: 'Dashboard - Posts - Tags',
      items: [
        {
          id: 1,
          value: 'FETCH_POSTS_TAGS_FAILED',
          label: 'FETCH_POSTS_TAGS_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_POSTS_TAGS_INVALID_DATA',
          label: 'FETCH_POSTS_TAGS_INVALID_DATA',
        },
        {
          id: 3,
          value: 'CREATE_POST_TAG_UNAUTHORIZED',
          label: 'CREATE_POST_TAG_UNAUTHORIZED',
        },
        {
          id: 4,
          value: 'CREATE_POST_TAG_INVALID_DATA',
          label: 'CREATE_POST_TAG_INVALID_DATA',
        },
        {
          id: 5,
          value: 'CREATE_POST_TAG_INVALID_DATA',
          label: 'CREATE_POST_TAG_INVALID_DATA',
        },
        {
          id: 6,
          value: 'CREATE_POST_TAG_FAILED',
          label: 'CREATE_POST_TAG_FAILED',
        },
        {
          id: 7,
          value: 'CREATE_POST_TAG_SUCCESSFUL',
          label: 'CREATE_POST_TAG_SUCCESSFUL',
        },
        {
          id: 8,
          value: 'EDIT_POST_TAG_UNAUTHORIZED',
          label: 'EDIT_POST_TAG_UNAUTHORIZED',
        },
        {
          id: 9,
          value: 'EDIT_POST_TAG_INVALID_DATA',
          label: 'EDIT_POST_TAG_INVALID_DATA',
        },
        {
          id: 10,
          value: 'EDIT_POST_TAG_INVALID_DATA',
          label: 'EDIT_POST_TAG_INVALID_DATA',
        },
        {
          id: 11,
          value: 'EDIT_POST_TAG_FAILED',
          label: 'EDIT_POST_TAG_FAILED',
        },
        {
          id: 12,
          value: 'EDIT_POST_TAG_SUCCESSFUL',
          label: 'EDIT_POST_TAG_SUCCESSFUL',
        },
        {
          id: 13,
          value: 'DELETE_POST_TAG_FAILED',
          label: 'DELETE_POST_TAG_FAILED',
        },
        {
          id: 14,
          value: 'DELETE_POST_TAG_SUCCESSFUL',
          label: 'DELETE_POST_TAG_SUCCESSFUL',
        },
      ],
    },
    {
      id: 17,
      section: 'Dashboard - Posts - Comments',
      items: [
        {
          id: 1,
          value: 'FETCH_POSTS_COMMENTS_FAILED',
          label: 'FETCH_POSTS_COMMENTS_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_POSTS_COMMENTS_INVALID_DATA',
          label: 'FETCH_POSTS_COMMENTS_INVALID_DATA',
        },
        {
          id: 3,
          value: 'APPROVE_POST_COMMENT_UNAUTHORIZED',
          label: 'APPROVE_POST_COMMENT_UNAUTHORIZED',
        },
        {
          id: 4,
          value: 'APPROVE_POST_COMMENT_INVALID_DATA',
          label: 'APPROVE_POST_COMMENT_INVALID_DATA',
        },
        {
          id: 5,
          value: 'APPROVE_POST_COMMENT_FAILED',
          label: 'APPROVE_POST_COMMENT_FAILED',
        },
        {
          id: 6,
          value: 'APPROVE_POST_COMMENT_SUCCESSFUL',
          label: 'APPROVE_POST_COMMENT_SUCCESSFUL',
        },
        {
          id: 7,
          value: 'REJECT_POST_COMMENT_UNAUTHORIZED',
          label: 'REJECT_POST_COMMENT_UNAUTHORIZED',
        },
        {
          id: 8,
          value: 'REJECT_POST_COMMENT_INVALID_DATA',
          label: 'REJECT_POST_COMMENT_INVALID_DATA',
        },
        {
          id: 9,
          value: 'REJECT_POST_COMMENT_FAILED',
          label: 'REJECT_POST_COMMENT_FAILED',
        },
        {
          id: 10,
          value: 'REJECT_POST_COMMENT_SUCCESSFUL',
          label: 'REJECT_POST_COMMENT_SUCCESSFUL',
        },
      ],
    },
    {
      id: 18,
      section: 'Dashboard - Posts - Authors',
      items: [
        {
          id: 1,
          value: 'FETCH_POSTS_AUTHORS_FAILED',
          label: 'FETCH_POSTS_AUTHORS_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_POSTS_AUTHORS_INVALID_DATA',
          label: 'FETCH_POSTS_AUTHORS_INVALID_DATA',
        },
        {
          id: 3,
          value: 'CREATE_POST_AUTHOR_UNAUTHORIZED',
          label: 'CREATE_POST_AUTHOR_UNAUTHORIZED',
        },
        {
          id: 4,
          value: 'CREATE_POST_AUTHOR_INVALID_DATA',
          label: 'CREATE_POST_AUTHOR_INVALID_DATA',
        },
        {
          id: 5,
          value: 'CREATE_POST_AUTHOR_INVALID_DATA',
          label: 'CREATE_POST_AUTHOR_INVALID_DATA',
        },
        {
          id: 6,
          value: 'CREATE_POST_AUTHOR_FAILED',
          label: 'CREATE_POST_AUTHOR_FAILED',
        },
        {
          id: 7,
          value: 'CREATE_POST_AUTHOR_SUCCESSFUL',
          label: 'CREATE_POST_AUTHOR_SUCCESSFUL',
        },
        {
          id: 8,
          value: 'EDIT_POST_AUTHOR_UNAUTHORIZED',
          label: 'EDIT_POST_AUTHOR_UNAUTHORIZED',
        },
        {
          id: 9,
          value: 'EDIT_POST_AUTHOR_INVALID_DATA',
          label: 'EDIT_POST_AUTHOR_INVALID_DATA',
        },
        {
          id: 10,
          value: 'EDIT_POST_AUTHOR_INVALID_DATA',
          label: 'EDIT_POST_AUTHOR_INVALID_DATA',
        },
        {
          id: 11,
          value: 'EDIT_POST_AUTHOR_FAILED',
          label: 'EDIT_POST_AUTHOR_FAILED',
        },
        {
          id: 12,
          value: 'EDIT_POST_AUTHOR_SUCCESSFUL',
          label: 'EDIT_POST_AUTHOR_SUCCESSFUL',
        },
        {
          id: 13,
          value: 'DELETE_POST_AUTHOR_FAILED',
          label: 'DELETE_POST_AUTHOR_FAILED',
        },
        {
          id: 14,
          value: 'DELETE_POST_AUTHOR_SUCCESSFUL',
          label: 'DELETE_POST_AUTHOR_SUCCESSFUL',
        },
      ],
    },
    {
      id: 19,
      section: 'Dashboard - Products',
      items: [],
    },
    {
      id: 20,
      section: 'Dashboard - Orders',
      items: [],
    },
    {
      id: 21,
      section: 'Dashboard - Customers',
      items: [
        {
          id: 1,
          value: 'FETCH_CUSTOMERS_FAILED',
          label: 'FETCH_CUSTOMERS_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_CUSTOMERS_INVALID_DATA',
          label: 'FETCH_CUSTOMERS_INVALID_DATA',
        },
        {
          id: 3,
          value: 'FETCH_CUSTOMER_ORDERS_FAILED',
          label: 'FETCH_CUSTOMER_ORDERS_FAILED',
        },
        {
          id: 4,
          value: 'FETCH_CUSTOMER_ORDERS_INVALID_DATA',
          label: 'FETCH_CUSTOMER_ORDERS_INVALID_DATA',
        },
        {
          id: 5,
          value: 'FETCH_CUSTOMER_REVIEWS_FAILED',
          label: 'FETCH_CUSTOMER_REVIEWS_FAILED',
        },
        {
          id: 6,
          value: 'FETCH_CUSTOMER_REVIEWS_INVALID_DATA',
          label: 'FETCH_CUSTOMER_REVIEWS_INVALID_DATA',
        },
      ],
    },
    {
      id: 22,
      section: 'Dashboard - Payments',
      items: [],
    },
    {
      id: 23,
      section: 'Dashboard - Shipping',
      items: [],
    },
    {
      id: 24,
      section: 'Dashboard - Coupons',
      items: [],
    },
    {
      id: 25,
      section: 'Dashboard - Media',
      items: [
        {
          id: 1,
          value: 'FETCH_MEDIA_FAILED',
          label: 'FETCH_MEDIA_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_MEDIA_INVALID_DATA',
          label: 'FETCH_MEDIA_INVALID_DATA',
        },
        {
          id: 3,
          value: 'UPDATE_MEDIA_UNAUTHORIZED',
          label: 'UPDATE_MEDIA_UNAUTHORIZED',
        },
        {
          id: 4,
          value: 'UPDATE_MEDIA_INVALID_DATA',
          label: 'UPDATE_MEDIA_INVALID_DATA',
        },
        {
          id: 5,
          value: 'UPDATE_MEDIA_FAILED',
          label: 'UPDATE_MEDIA_FAILED',
        },
        {
          id: 6,
          value: 'UPDATE_MEDIA_SUCCESSFUL',
          label: 'UPDATE_MEDIA_SUCCESSFUL',
        },
        {
          id: 7,
          value: 'DELETE_MEDIA_UNAUTHORIZED',
          label: 'DELETE_MEDIA_UNAUTHORIZED',
        },
        {
          id: 8,
          value: 'DELETE_MEDIA_INVALID_DATA',
          label: 'DELETE_MEDIA_INVALID_DATA',
        },
        {
          id: 9,
          value: 'DELETE_MEDIA_FAILED',
          label: 'DELETE_MEDIA_FAILED',
        },
        {
          id: 10,
          value: 'DELETE_MEDIA_SUCCESSFUL',
          label: 'DELETE_MEDIA_SUCCESSFUL',
        },
        {
          id: 11,
          value: 'UPLOAD_MEDIA_UNAUTHORIZED',
          label: 'UPLOAD_MEDIA_UNAUTHORIZED',
        },
        {
          id: 12,
          value: 'UPLOAD_MEDIA_FAILED',
          label: 'UPLOAD_MEDIA_FAILED',
        },
        {
          id: 13,
          value: 'UPLOAD_MEDIA_SUCCESSFUL',
          label: 'UPLOAD_MEDIA_SUCCESSFUL',
        },
      ],
    },
    {
      id: 26,
      section: 'Dashboard - Instagram feed',
      items: [
        {
          id: 1,
          value: 'FETCH_INSTAGRAM_FEEDS_FAILED',
          label: 'FETCH_INSTAGRAM_FEEDS_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_INSTAGRAM_FEEDS_INVALID_DATA',
          label: 'FETCH_INSTAGRAM_FEEDS_INVALID_DATA',
        },
        {
          id: 3,
          value: 'FETCH_INSTAGRAM_FEED_FORM_IMAGES_FAILED',
          label: 'FETCH_INSTAGRAM_FEED_FORM_IMAGES_FAILED',
        },
        {
          id: 4,
          value: 'FETCH_INSTAGRAM_FEED_FORM_IMAGES_INVALID_DATA',
          label: 'FETCH_INSTAGRAM_FEED_FORM_IMAGES_INVALID_DATA',
        },
        {
          id: 5,
          value: 'FETCH_INSTAGRAM_FEED_FORM_MEDIA_FAILED',
          label: 'FETCH_INSTAGRAM_FEED_FORM_MEDIA_FAILED',
        },
        {
          id: 6,
          value: 'FETCH_INSTAGRAM_FEED_FORM_MEDIA_INVALID_DATA',
          label: 'FETCH_INSTAGRAM_FEED_FORM_MEDIA_INVALID_DATA',
        },
        {
          id: 7,
          value: 'CREATE_INSTAGRAM_FEED_UNAUTHORIZED',
          label: 'CREATE_INSTAGRAM_FEED_UNAUTHORIZED',
        },
        {
          id: 8,
          value: 'CREATE_INSTAGRAM_FEED_INVALID_DATA',
          label: 'CREATE_INSTAGRAM_FEED_INVALID_DATA',
        },
        {
          id: 9,
          value: 'CREATE_INSTAGRAM_FEED_FAILED',
          label: 'CREATE_INSTAGRAM_FEED_FAILED',
        },
        {
          id: 10,
          value: 'CREATE_INSTAGRAM_FEED_MEDIA_FAILED',
          label: 'CREATE_INSTAGRAM_FEED_MEDIA_FAILED',
        },
        {
          id: 11,
          value: 'CREATE_INSTAGRAM_FEED_MEDIA_CLEANUP_FAILED',
          label: 'CREATE_INSTAGRAM_FEED_MEDIA_CLEANUP_FAILED',
        },
        {
          id: 12,
          value: 'UPDATE_INSTAGRAM_FEED_UNAUTHORIZED',
          label: 'UPDATE_INSTAGRAM_FEED_UNAUTHORIZED',
        },
        {
          id: 13,
          value: 'UPDATE_INSTAGRAM_FEED_INVALID_DATA',
          label: 'UPDATE_INSTAGRAM_FEED_INVALID_DATA',
        },
        {
          id: 14,
          value: 'UPDATE_INSTAGRAM_FEED_FAILED',
          label: 'UPDATE_INSTAGRAM_FEED_FAILED',
        },
        {
          id: 15,
          value: 'UPDATE_INSTAGRAM_FEED_MEDIA_DELETE_FAILED',
          label: 'UPDATE_INSTAGRAM_FEED_MEDIA_DELETE_FAILED',
        },
        {
          id: 16,
          value: 'UPDATE_INSTAGRAM_FEED_MEDIA_INSERT_FAILED',
          label: 'UPDATE_INSTAGRAM_FEED_MEDIA_INSERT_FAILED',
        },
        {
          id: 17,
          value: 'UPDATE_INSTAGRAM_FEED_SUCCESSFUL',
          label: 'UPDATE_INSTAGRAM_FEED_SUCCESSFUL',
        },
        {
          id: 18,
          value: 'DELETE_INSTAGRAM_FEED_FAILED',
          label: 'DELETE_INSTAGRAM_FEED_FAILED',
        },
        {
          id: 19,
          value: 'DELETE_INSTAGRAM_FEED_SUCCESSFUL',
          label: 'DELETE_INSTAGRAM_FEED_SUCCESSFUL',
        },
      ],
    },
    {
      id: 27,
      section: 'Dashboard - Users',
      items: [
        {
          id: 1,
          value: 'FETCH_USERS_FAILED',
          label: 'FETCH_USERS_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_USERS_INVALID_DATA',
          label: 'FETCH_USERS_INVALID_DATA',
        },
        {
          id: 3,
          value: 'FETCH_USER_LOGS_FAILED',
          label: 'FETCH_USER_LOGS_FAILED',
        },
        {
          id: 4,
          value: 'FETCH_USER_LOGS_INVALID_DATA',
          label: 'FETCH_USER_LOGS_INVALID_DATA',
        },
        {
          id: 5,
          value: 'CREATE_USER_UNAUTHORIZED',
          label: 'CREATE_USER_UNAUTHORIZED',
        },
        {
          id: 6,
          value: 'CREATE_USER_INVALID_DATA',
          label: 'CREATE_USER_INVALID_DATA',
        },
        {
          id: 7,
          value: 'CREATE_USER_FAILED',
          label: 'CREATE_USER_FAILED',
        },
        {
          id: 8,
          value: 'CREATE_USER_SUCCESSFUL',
          label: 'CREATE_USER_SUCCESSFUL',
        },
        {
          id: 9,
          value: 'UPDATE_USER_UNAUTHORIZED',
          label: 'UPDATE_USER_UNAUTHORIZED',
        },
        {
          id: 10,
          value: 'UPDATE_USER_INVALID_DATA',
          label: 'UPDATE_USER_INVALID_DATA',
        },
        {
          id: 11,
          value: 'UPDATE_USER_FAILED',
          label: 'UPDATE_USER_FAILED',
        },
        {
          id: 12,
          value: 'UPDATE_USER_SUCCESSFUL',
          label: 'UPDATE_USER_SUCCESSFUL',
        },
        {
          id: 13,
          value: 'DELETE_USER_UNAUTHORIZED',
          label: 'DELETE_USER_UNAUTHORIZED',
        },
        {
          id: 14,
          value: 'DELETE_USER_INVALID_DATA',
          label: 'DELETE_USER_INVALID_DATA',
        },
        {
          id: 15,
          value: 'DELETE_USER_SUCCESSFUL',
          label: 'DELETE_USER_SUCCESSFUL',
        },
      ],
    },
    {
      id: 28,
      section: 'Dashboard - Logs',
      items: [
        {
          id: 1,
          value: 'FETCH_LOGS_FAILED',
          label: 'FETCH_LOGS_FAILED',
        },
        {
          id: 2,
          value: 'FETCH_LOGS_INVALID_DATA',
          label: 'FETCH_LOGS_INVALID_DATA',
        },
      ],
    },
    {
      id: 29,
      section: 'Dashboard - Account',
      items: [
        {
          id: 1,
          value: 'UPDATE_ACCOUNT_NAME_UNAUTHORIZED',
          label: 'UPDATE_ACCOUNT_NAME_UNAUTHORIZED',
        },
        {
          id: 2,
          value: 'UPDATE_ACCOUNT_NAME_INVALID_DATA',
          label: 'UPDATE_ACCOUNT_NAME_INVALID_DATA',
        },
        {
          id: 3,
          value: 'UPDATE_ACCOUNT_NAME_FAILED',
          label: 'UPDATE_ACCOUNT_NAME_FAILED',
        },
        {
          id: 4,
          value: 'UPDATE_ACCOUNT_NAME_SUCCESSFUL',
          label: 'UPDATE_ACCOUNT_NAME_SUCCESSFUL',
        },
        {
          id: 5,
          value: 'UPDATE_ACCOUNT_EMAIL_UNAUTHORIZED',
          label: 'UPDATE_ACCOUNT_EMAIL_UNAUTHORIZED',
        },
        {
          id: 6,
          value: 'UPDATE_ACCOUNT_EMAIL_INVALID_DATA',
          label: 'UPDATE_ACCOUNT_EMAIL_INVALID_DATA',
        },
        {
          id: 7,
          value: 'UPDATE_ACCOUNT_EMAIL_FAILED',
          label: 'UPDATE_ACCOUNT_EMAIL_FAILED',
        },
        {
          id: 8,
          value: 'UPDATE_ACCOUNT_EMAIL_SUCCESSFUL',
          label: 'UPDATE_ACCOUNT_EMAIL_SUCCESSFUL',
        },
        {
          id: 9,
          value: 'UPDATE_ACCOUNT_PASSWORD_UNAUTHORIZED',
          label: 'UPDATE_ACCOUNT_PASSWORD_UNAUTHORIZED',
        },
        {
          id: 10,
          value: 'UPDATE_ACCOUNT_PASSWORD_INVALID_DATA',
          label: 'UPDATE_ACCOUNT_PASSWORD_INVALID_DATA',
        },
        {
          id: 11,
          value: 'UPDATE_ACCOUNT_PASSWORD_CURRENT_INCORRECT',
          label: 'UPDATE_ACCOUNT_PASSWORD_CURRENT_INCORRECT',
        },
        {
          id: 12,
          value: 'UPDATE_ACCOUNT_PASSWORD_FAILED',
          label: 'UPDATE_ACCOUNT_PASSWORD_FAILED',
        },
        {
          id: 13,
          value: 'UPDATE_ACCOUNT_PASSWORD_SUCCESSFUL',
          label: 'UPDATE_ACCOUNT_PASSWORD_SUCCESSFUL',
        },
        {
          id: 14,
          value: 'DELETE_ACCOUNT_UNAUTHORIZED',
          label: 'DELETE_ACCOUNT_UNAUTHORIZED',
        },
        {
          id: 15,
          value: 'DELETE_ACCOUNT_INVALID_DATA',
          label: 'DELETE_ACCOUNT_INVALID_DATA',
        },
        {
          id: 16,
          value: 'DELETE_ACCOUNT_SUCCESSFUL',
          label: 'DELETE_ACCOUNT_SUCCESSFUL',
        },
      ],
    },
  ];

  return <ListFilter type={'event_name'} label={'Event name'} options={filterOptions} />;
}
