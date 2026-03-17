import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { isSupportedLocale } from './config';

export default getRequestConfig(async ({ locale }) => {
  if (!isSupportedLocale(locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
