export const SITE_NAME = 'Dashboard - Aurora';
export const TITLE_SUFFIX = ` | ${SITE_NAME}`;

export const DEFAULT_METADATA = {
  title: {
    default: SITE_NAME,
    template: `%s${TITLE_SUFFIX}`,
  },
  description: 'Aurora dashboard',
};
