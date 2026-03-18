import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { Analytics } from '@vercel/analytics/next';

import '@/app/globals.css';
import { Header } from '@/components/layouts/Header/Header';
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
            <Header />
            <main className="flex-1 pt-16 pb-20 md:pb-0">{children}</main>
            <nav className="fixed bottom-0 left-0 z-50 border-t-2 border-gray-100 h-14 w-full bg-background block md:hidden"></nav>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
