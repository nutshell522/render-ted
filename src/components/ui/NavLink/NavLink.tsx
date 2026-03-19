'use client';

import { AnchorHTMLAttributes, MouseEvent } from 'react';

import clsx from 'clsx';

import { Link, usePathname } from '@/i18n';

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * 導覽連結：依目前路徑判斷是否為當前頁。
 * - 非當前頁：使用 i18n `Link` 可正常導向。
 * - 當前頁：改為 `<a>` 並標示 `aria-current="page"`，以 `preventDefault` 避免重複導向（視覺上不可點、行為上不導航）。
 */
export const NavLink: React.FC<NavLinkProps> = ({
  children,
  className,
  href,
  onClick,
  ...props
}) => {
  const pathname = usePathname();
  const isActive =
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const handleNavLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isActive) {
      e.preventDefault(); // 當前頁面不導航
      return;
    }
    onClick?.(e);
  };

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      data-active={isActive}
      className={clsx(
        'text-md transition-colors',
        isActive
          ? 'text-primary font-bold cursor-default pointer-events-none'
          : 'text-gray-800 dark:text-gray-200 hover:text-primary',
        className,
      )}
      onClick={handleNavLinkClick}
      {...props}
    >
      {children}
    </Link>
  );
};
