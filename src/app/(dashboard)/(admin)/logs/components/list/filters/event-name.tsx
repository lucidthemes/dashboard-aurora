import ListFilter from '@/components/list/filters';

export default function LogsListFiltersEventName() {
  const filterOptions = [
    {
      id: 1,
      section: 'Auth',
      items: [
        {
          id: 1,
          value: 'SIGN_UP_FAILED',
          label: 'SIGN_UP_FAILED',
        },
        {
          id: 2,
          value: 'SIGN_UP_NO_USER',
          label: 'SIGN_UP_NO_USER',
        },
        {
          id: 3,
          value: 'SIGN_UP_SUCCESSFUL',
          label: 'SIGN_UP_SUCCESSFUL',
        },
        {
          id: 4,
          value: 'SIGN_IN_FAILED',
          label: 'SIGN_IN_FAILED',
        },
        {
          id: 5,
          value: 'SIGN_IN_NO_USER',
          label: 'SIGN_IN_NO_USER',
        },
        {
          id: 6,
          value: 'SIGN_IN_SUCCESSFUL',
          label: 'SIGN_IN_SUCCESSFUL',
        },
        {
          id: 7,
          value: 'LOST_PASSWORD_FAILED',
          label: 'LOST_PASSWORD_FAILED',
        },
        {
          id: 8,
          value: 'LOST_PASSWORD_SUCCESSFUL',
          label: 'LOST_PASSWORD_SUCCESSFUL',
        },
        {
          id: 9,
          value: 'RESET_PASSWORD_FAILED',
          label: 'RESET_PASSWORD_FAILED',
        },
        {
          id: 10,
          value: 'RESET_PASSWORD_NO_USER',
          label: 'RESET_PASSWORD_NO_USER',
        },
        {
          id: 11,
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
          value: 'UPDATE_SHIPPING_ADDRESS_FAILED',
          label: 'UPDATE_SHIPPING_ADDRESS_FAILED',
        },
        {
          id: 2,
          value: 'UPDATE_BILLING_ADDRESS_FAILED',
          label: 'UPDATE_BILLING_ADDRESS_FAILED',
        },
        {
          id: 3,
          value: 'UPDATE_SHIPPING_ADDRESS_SUCCESSFUL',
          label: 'UPDATE_SHIPPING_ADDRESS_SUCCESSFUL',
        },
        {
          id: 4,
          value: 'UPDATE_BILLING_ADDRESS_SUCCESSFUL',
          label: 'UPDATE_BILLING_ADDRESS_SUCCESSFUL',
        },
        {
          id: 5,
          value: 'UPDATE_EMAIL_FAILED',
          label: 'UPDATE_EMAIL_FAILED',
        },
        {
          id: 6,
          value: 'UPDATE_EMAIL_SUCCESSFUL',
          label: 'UPDATE_EMAIL_SUCCESSFUL',
        },
        {
          id: 7,
          value: 'UPDATE_NAME_FAILED',
          label: 'UPDATE_NAME_FAILED',
        },
        {
          id: 8,
          value: 'UPDATE_NAME_SUCCESSFUL',
          label: 'UPDATE_NAME_SUCCESSFUL',
        },
        {
          id: 9,
          value: 'UPDATE_PASSWORD_FAILED',
          label: 'UPDATE_PASSWORD_FAILED',
        },
        {
          id: 10,
          value: 'UPDATE_PASSWORD_SUCCESSFUL',
          label: 'UPDATE_PASSWORD_SUCCESSFUL',
        },
      ],
    },
    {
      id: 3,
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
        {
          id: 6,
          value: 'CREATE_INSTAGRAM_FEED_UNAUTHORIZED',
          label: 'CREATE_INSTAGRAM_FEED_UNAUTHORIZED',
        },
        {
          id: 7,
          value: 'CREATE_INSTAGRAM_FEED_FAILED',
          label: 'CREATE_INSTAGRAM_FEED_FAILED',
        },
        {
          id: 8,
          value: 'CREATE_INSTAGRAM_FEED_MEDIA_FAILED',
          label: 'CREATE_INSTAGRAM_FEED_MEDIA_FAILED',
        },
        {
          id: 9,
          value: 'CREATE_INSTAGRAM_FEED_MEDIA_CLEANUP_FAILED',
          label: 'CREATE_INSTAGRAM_FEED_MEDIA_CLEANUP_FAILED',
        },
        {
          id: 10,
          value: 'UPDATE_INSTAGRAM_FEED_UNAUTHORIZED',
          label: 'UPDATE_INSTAGRAM_FEED_UNAUTHORIZED',
        },
        {
          id: 11,
          value: 'UPDATE_INSTAGRAM_FEED_FAILED',
          label: 'UPDATE_INSTAGRAM_FEED_FAILED',
        },
        {
          id: 12,
          value: 'UPDATE_INSTAGRAM_FEED_MEDIA_DELETE_FAILED',
          label: 'UPDATE_INSTAGRAM_FEED_MEDIA_DELETE_FAILED',
        },
        {
          id: 13,
          value: 'UPDATE_INSTAGRAM_FEED_MEDIA_INSERT_FAILED',
          label: 'UPDATE_INSTAGRAM_FEED_MEDIA_INSERT_FAILED',
        },
        {
          id: 14,
          value: 'UPDATE_INSTAGRAM_FEED_SUCCESSFUL',
          label: 'UPDATE_INSTAGRAM_FEED_SUCCESSFUL',
        },
      ],
    },
    {
      id: 4,
      section: 'Dashboard - Posts',
      items: [],
    },
    {
      id: 5,
      section: 'Dashboard - Products',
      items: [],
    },
    {
      id: 6,
      section: 'Dashboard - Orders',
      items: [],
    },
    {
      id: 7,
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
      id: 8,
      section: 'Dashboard - Payments',
      items: [],
    },
    {
      id: 9,
      section: 'Dashboard - Shipping',
      items: [],
    },
    {
      id: 10,
      section: 'Dashboard - Coupons',
      items: [],
    },
    {
      id: 11,
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
          value: 'UPDATE_MEDIA_FAILED',
          label: 'UPDATE_MEDIA_FAILED',
        },
        {
          id: 5,
          value: 'UPDATE_MEDIA_SUCCESSFUL',
          label: 'UPDATE_MEDIA_SUCCESSFUL',
        },
        {
          id: 6,
          value: 'DELETE_MEDIA_UNAUTHORIZED',
          label: 'DELETE_MEDIA_UNAUTHORIZED',
        },
        {
          id: 7,
          value: 'DELETE_MEDIA_FAILED',
          label: 'DELETE_MEDIA_FAILED',
        },
        {
          id: 8,
          value: 'DELETE_MEDIA_SUCCESSFUL',
          label: 'DELETE_MEDIA_SUCCESSFUL',
        },
      ],
    },
    {
      id: 12,
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
      ],
    },
    {
      id: 13,
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
          value: 'CREATE_USER_FAILED',
          label: 'CREATE_USER_FAILED',
        },
        {
          id: 7,
          value: 'CREATE_USER_SUCCESSFUL',
          label: 'CREATE_USER_SUCCESSFUL',
        },
        {
          id: 8,
          value: 'UPDATE_USER_UNAUTHORIZED',
          label: 'UPDATE_USER_UNAUTHORIZED',
        },
        {
          id: 9,
          value: 'UPDATE_USER_FAILED',
          label: 'UPDATE_USER_FAILED',
        },
        {
          id: 10,
          value: 'DELETE_USER_UNAUTHORIZED',
          label: 'DELETE_USER_UNAUTHORIZED',
        },
        {
          id: 11,
          value: 'UPDATE_USER_SUCCESSFUL',
          label: 'UPDATE_USER_SUCCESSFUL',
        },
        {
          id: 12,
          value: 'DELETE_USER_SUCCESSFUL',
          label: 'DELETE_USER_SUCCESSFUL',
        },
      ],
    },
    {
      id: 14,
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
      id: 15,
      section: 'Dashboard - Account',
      items: [
        {
          id: 1,
          value: 'UPDATE_ACCOUNT_NAME_UNAUTHORIZED',
          label: 'UPDATE_ACCOUNT_NAME_UNAUTHORIZED',
        },
        {
          id: 2,
          value: 'UPDATE_ACCOUNT_NAME_FAILED',
          label: 'UPDATE_ACCOUNT_NAME_FAILED',
        },
        {
          id: 3,
          value: 'UPDATE_ACCOUNT_NAME_SUCCESSFUL',
          label: 'UPDATE_ACCOUNT_NAME_SUCCESSFUL',
        },
        {
          id: 4,
          value: 'UPDATE_ACCOUNT_EMAIL_UNAUTHORIZED',
          label: 'UPDATE_ACCOUNT_EMAIL_UNAUTHORIZED',
        },
        {
          id: 5,
          value: 'UPDATE_ACCOUNT_EMAIL_FAILED',
          label: 'UPDATE_ACCOUNT_EMAIL_FAILED',
        },
        {
          id: 6,
          value: 'UPDATE_ACCOUNT_EMAIL_SUCCESSFUL',
          label: 'UPDATE_ACCOUNT_EMAIL_SUCCESSFUL',
        },
        {
          id: 7,
          value: 'UPDATE_ACCOUNT_PASSWORD_UNAUTHORIZED',
          label: 'UPDATE_ACCOUNT_PASSWORD_UNAUTHORIZED',
        },
        {
          id: 8,
          value: 'UPDATE_ACCOUNT_PASSWORD_FAILED',
          label: 'UPDATE_ACCOUNT_PASSWORD_FAILED',
        },
        {
          id: 9,
          value: 'UPDATE_ACCOUNT_PASSWORD_SUCCESSFUL',
          label: 'UPDATE_ACCOUNT_PASSWORD_SUCCESSFUL',
        },
        {
          id: 10,
          value: 'DELETE_ACCOUNT_UNAUTHORIZED',
          label: 'DELETE_ACCOUNT_UNAUTHORIZED',
        },
        {
          id: 11,
          value: 'DELETE_ACCOUNT_SUCCESSFUL',
          label: 'DELETE_ACCOUNT_SUCCESSFUL',
        },
      ],
    },
  ];

  return <ListFilter type={'event_name'} label={'Event name'} options={filterOptions} />;
}
