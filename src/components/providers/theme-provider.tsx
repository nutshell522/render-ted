'use client';

import { ThemeProvider as NextThemeProvider, type ThemeProviderProps } from 'next-themes';

/**
 * 應用程式主題 Provider（next-themes），供根 layout 包住子樹。
 */
export function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemeProvider {...props} />;
}
