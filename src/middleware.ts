import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n';

export default createMiddleware({
  ...routing,
});

export const config = {
  // 匹配所有需要處理 i18n 的路由，排除 API、靜態檔案 (_next, public 等)
  matcher: ['/', '/(zh-TW|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
