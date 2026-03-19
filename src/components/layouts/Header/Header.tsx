import Image from 'next/image';

import { NavLink } from '@/components/ui/NavLink';
import { personal } from '@/content/config/personal';
import { Link } from '@/i18n';

/**
 * Header 元件：網站的固定頂部導覽列。
 *
 * - 顯示個人 Logo 與站名（取自 `personal.title`）
 * - 提供主要導覽連結（使用 i18n 的 `Link` 以支援語系路由）
 */
export const Header: React.FC = () => {
  const { title } = personal;

  return (
    <header className="fixed top-0 left-0 z-50 bg-background/85 backdrop-blur-md h-16 w-full border-b-2 border-gray-100 px-10">
      <div className="h-full flex gap-10">
        {/* LOGO */}
        <Link href="/" className="flex h-full items-center gap-1">
          <Image src="/ted_logo.png" alt="logo" width={50} height={50} />
          <h1 className="text-2xl font-bold">{title}</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex h-full items-center gap-6">
          <NavLink href="/about">關於我</NavLink>
          <NavLink href="/portfolio">作品集</NavLink>
          <NavLink href="/contact">聯絡我</NavLink>
        </nav>
      </div>
    </header>
  );
};
