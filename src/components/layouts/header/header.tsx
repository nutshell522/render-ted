import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { NavLink } from '@/components/ui/nav-link';
import { personal } from '@/content/config/personal';
import { Link } from '@/i18n';

/**
 * Header：網站固定頂部導覽列。
 *
 * - 顯示 Logo 與站名（來自 `personal.title`）
 * - 主要導覽使用 i18n 的 `aria-label`，以及 `NavLink` 的 `aria-current="page"` 標示目前頁
 * - 首頁連結以 `aria-label` 提供語意；圖片 `alt` 留空，避免與連結名稱重複朗讀
 */
export async function Header() {
  const { title } = personal;
  const t = await getTranslations('Navigation');

  return (
    <header className="fixed top-0 left-0 z-50 bg-background/85 backdrop-blur-md h-16 w-full border-b-2 border-gray-100 px-10">
      <div className="h-full flex gap-10">
        {/* 品牌／標題區 */}
        <Link
          href="/"
          className="flex h-full items-center gap-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={t('homeLinkAriaLabel', { site: title })}
        >
          <Image src="/ted_logo.png" alt="" width={50} height={50} />
          <span className="text-2xl font-bold" aria-hidden="true">
            {title}
          </span>
        </Link>

        {/* 主要導覽（桌面） */}
        <nav
          className="hidden md:flex h-full items-center gap-6"
          aria-label={t('mainNavAriaLabel')}
        >
          <NavLink href="/about">{t('about')}</NavLink>
          <NavLink href="/portfolio">{t('portfolio')}</NavLink>
          <NavLink href="/contact">{t('contact')}</NavLink>
        </nav>
      </div>
      {/* 行動版底部導覽預留 */}
    </header>
  );
}
