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
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}`);

  const handleActiveAnchorClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
  };

  return (
    <>
      {isActive && (
        <a
          href={href}
          aria-current="page"
          className={clsx('text-md text-primary font-bold cursor-default', className)}
          onClick={handleActiveAnchorClick}
          {...props}
        >
          {children}
        </a>
      )}
      {!isActive && (
        <Link
          className={clsx('text-md text-gray-800 dark:text-gray-200 hover:text-primary', className)}
          href={href}
          onClick={onClick}
          {...props}
        >
          {children}
        </Link>
      )}
    </>
  );
};
