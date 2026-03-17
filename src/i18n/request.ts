import { getRequestConfig } from 'next-intl/server';

import { DEFAULT_LOCALE, isSupportedLocale } from './config';

export default getRequestConfig(async ({ locale }) => {
  const validLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
  };
});
