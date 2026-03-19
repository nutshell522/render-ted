'use client';

import { AnchorHTMLAttributes, MouseEvent } from 'react';

import clsx from 'clsx';

import { Link, usePathname } from '@/i18n';

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * 導覽連結：依目前路徑判斷是否為當前頁。
 * - 一律使用 i18n `Link` 以維持語系路由。
 * - 當前頁：`aria-current="page"`、`preventDefault` 避免重複導向；保留鍵盤焦點樣式（不使用 `pointer-events-none`）。
 */
export const NavLink: React.FC<NavLinkProps> = ({
  children,
  className,
  href,
  onClick,
  ...rest
}) => {
  const pathname = usePathname();
  const isActive =
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const handleNavLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isActive) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <Link
      href={href}
      prefetch={!isActive}
      aria-current={isActive ? 'page' : undefined}
      data-active={isActive}
      className={clsx(
        'text-md transition-colors rounded-md',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isActive
          ? 'text-primary font-bold cursor-default'
          : 'text-gray-800 dark:text-gray-200 hover:text-primary',
        className,
      )}
      onClick={handleNavLinkClick}
      {...rest}
    >
      {children}
    </Link>
  );
};
