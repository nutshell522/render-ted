import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import clsx from 'clsx';

interface ButtonBaseProps {
  /** 按鈕內容，可放文字或圖示等 React 節點 */
  children: ReactNode;
  /** 視覺樣式，預設為 primary */
  variant?: 'primary' | 'secondary';
  /** 額外 className，供外部覆寫或擴充 */
  className?: string;
  /** 是否啟用外框模式 */
  outline?: boolean;
}

/** 通用 Button props，支援透過 `as` 切換底層元素（例如 button、a） */
export type ButtonProps<T extends ElementType> = ButtonBaseProps & {
  /** 指定要渲染的元素類型 */
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof ButtonBaseProps | 'as'>;

/**
 * 通用按鈕元件
 * - 預設使用語意化色票（primary / secondary）
 * - 內建 focus 與 disabled 狀態
 * - 可透過 `as` 轉成連結或其他元素
 */
export const Button = <T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  children,
  className,
  outline = false,
  ...props
}: ButtonProps<T>) => {
  const Component = as || 'button';

  // 基礎互動樣式：尺寸、字重、focus ring、disabled 狀態
  const baseStyles =
    'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50';

  // 外框模式：保留透明背景並使用設計 token 邊框色
  const outlineStyle = outline ? 'border border-border bg-transparent' : '';

  // 依 variant 套用語意化主題色
  const variantStyles =
    variant === 'primary'
      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
      : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground';

  return (
    <Component className={clsx(baseStyles, outlineStyle, variantStyles, className)} {...props}>
      {children}
    </Component>
  );
};
