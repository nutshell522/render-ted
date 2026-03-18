// 支援的語系
export const LOCALE_LABELS = {
  en: 'English',
  'zh-TW': '繁體中文',
} as const;

// 語系型別
export type SupportedLocale = keyof typeof LOCALE_LABELS;

// 支援的語系陣列
export const SUPPORTED_LOCALES = Object.keys(LOCALE_LABELS) as SupportedLocale[];

// 預設語系
export const DEFAULT_LOCALE = 'zh-TW';

// 支援語系守衛
export const isSupportedLocale = (locale: unknown): locale is SupportedLocale => {
  return typeof locale === 'string' && locale in LOCALE_LABELS;
};
