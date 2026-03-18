import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

import { Analytics } from '@vercel/analytics/next';

import '@/app/globals.css';
import { ThemeProvider } from '@/components/providers';
import { glowSansTC } from '@/fonts/glowSans';
import { DEFAULT_LOCALE, isSupportedLocale } from '@/i18n';

type LayoutParams = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: LayoutParams }): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;

  const t = await getTranslations({ locale: validLocale, namespace: 'Personal' });
  return {
    title: t('siteTitle'),
    description: t('siteDescription'),
  };
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: LayoutParams;
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  const validLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;

  setRequestLocale(validLocale);
  const messages = await getMessages();
  const tPersonal = await getTranslations('Personal');

  return (
    <html lang={validLocale} suppressHydrationWarning>
      <body className={`${glowSansTC.variable} antialiased flex flex-col h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header className="h-16 border-b-2 border-gray-100">
              <div></div>
              <Link href={'/'}>
                <h1>{tPersonal('name')}</h1>
              </Link>
            </header>
            <main className="flex-1 overflow-y-auto">{children}</main>
            <aside className="border-t-2 border-gray-100 h-14 block md:hidden"></aside>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
