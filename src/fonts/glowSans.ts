import localFont from 'next/font/local';

export const glowSansTC = localFont({
  src: [
    {
      path: './glow-sans-tc-light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './glow-sans-tc-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './glow-sans-tc-bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-glow-sans-tc',
  display: 'swap',
});
