import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n';

/**
 * 404 頁面：放在 `[locale]` 底下，會由 `layout.tsx` 包住（Header、Theme、底部 nav 等）。
 */
export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-medium text-muted-foreground">{t('code')}</p>
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      <p className="max-w-md text-muted-foreground">{t('description')}</p>
      <Link
        href="/"
        className="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        {t('backHome')}
      </Link>
    </div>
  );
}
