import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './config';

export const routing = defineRouting({
  // 支援的語系列表
  locales: SUPPORTED_LOCALES,
  // 預設語系
  defaultLocale: DEFAULT_LOCALE,
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
