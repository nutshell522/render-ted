import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

import { Analytics } from '@vercel/analytics/next';

import '@/app/globals.css';
import { ThemeProvider } from '@/components/providers';
import { glowSansTC } from '@/fonts/glowSans';
import { DEFAULT_LOCALE, isSupportedLocale } from '@/i18n';

export const metadata: Metadata = {
  title: 'Ted Yin | Frontend Engineer',
  description: 'Personal portfolio of Ted Yin, a passionate Frontend Engineer.',
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
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
            <header className="h-16 border-b-2 border-gray-100">
              <div></div>
              <Link href={'/'}>
                <h1>Ted Yin</h1>
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
