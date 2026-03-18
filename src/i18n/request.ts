import { getRequestConfig } from 'next-intl/server';

import { DEFAULT_LOCALE, isSupportedLocale } from './config';

export default getRequestConfig(async ({ locale }) => {
  const validLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;

  return {
    locale: validLocale,
    messages: {
      Navigation: (await import(`./messages/${validLocale}/Navigation.json`)).default,
      Hero: (await import(`./messages/${validLocale}/Hero.json`)).default,
      About: (await import(`./messages/${validLocale}/About.json`)).default,
      Portfolio: (await import(`./messages/${validLocale}/Portfolio.json`)).default,
      Contact: (await import(`./messages/${validLocale}/Contact.json`)).default,
    },
  };
});
