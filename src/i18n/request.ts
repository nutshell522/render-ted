import { getRequestConfig } from 'next-intl/server';

import { DEFAULT_LOCALE, isSupportedLocale } from './config';

export default getRequestConfig(async ({ locale }) => {
  const validLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;

  return {
    locale: validLocale,
    messages: {
      Navigation: (await import(`../content/locales/${validLocale}/Navigation.json`)).default,
      Hero: (await import(`../content/locales/${validLocale}/Hero.json`)).default,
      About: (await import(`../content/locales/${validLocale}/About.json`)).default,
      Portfolio: (await import(`../content/locales/${validLocale}/Portfolio.json`)).default,
      Contact: (await import(`../content/locales/${validLocale}/Contact.json`)).default,
      Personal: (await import(`../content/locales/${validLocale}/Personal.json`)).default,
    },
  };
});
