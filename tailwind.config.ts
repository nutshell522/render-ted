import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-glow-sans)', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
};
export default config;
