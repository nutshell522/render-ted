import { NextIntlClientProvider } from 'next-intl';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { DEFAULT_LOCALE } from '@/i18n';

import { NavLink } from './NavLink';

const meta: Meta<typeof NavLink> = {
  title: 'Components/UI/NavLink',
  component: NavLink,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale={DEFAULT_LOCALE} messages={{}}>
        <nav className="flex gap-6">
          <Story />
        </nav>
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavLink>;

/** 目前路由為首頁、`href` 為 `/` 時為選取狀態（`<a>` + `aria-current`）。 */
export const ActiveHome: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
  args: {
    href: '/',
    children: '首頁',
  },
};

/** 目前路由與 `href` 一致時為選取狀態。 */
export const ActiveSection: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/about',
      },
    },
  },
  args: {
    href: '/about',
    children: '關於我',
  },
};

/** `pathname` 以 `href` 為前綴時視為該區塊啟用（例如子頁）。 */
export const ActiveNestedPath: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/portfolio/project-1',
      },
    },
  },
  args: {
    href: '/portfolio',
    children: '作品集',
  },
};

/** 非目前頁：可點擊的 i18n `Link`。 */
export const Inactive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
  args: {
    href: '/contact',
    children: '聯絡我',
  },
};

/** 導覽列情境：多個連結混合啟用／未啟用。 */
export const InHeaderNav: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/portfolio',
      },
    },
  },
  render: () => (
    <>
      <NavLink href="/about">關於我</NavLink>
      <NavLink href="/portfolio">作品集</NavLink>
      <NavLink href="/contact">聯絡我</NavLink>
    </>
  ),
};
