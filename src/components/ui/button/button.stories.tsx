import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Mail } from 'lucide-react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryButton: Story = {
  args: {
    children: '測試',
    variant: 'default',
  },
};

export const SecondaryButton: Story = {
  args: {
    children: '測試',
    variant: 'secondary',
  },
};

export const LinkButton: Story = {
  render: (args) => (
    <Button asChild {...args}>
      <a href="https://google.com" target="_blank" rel="noreferrer">
        我是連結
      </a>
    </Button>
  ),
  args: {
    variant: 'link',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">預設</Button>
      <Button variant="secondary">次要</Button>
      <Button variant="outline">外框</Button>
      <Button variant="ghost">幽靈</Button>
      <Button variant="link">連結</Button>
      <Button variant="destructive">危險</Button>
    </div>
  ),
};

const mailAria = '寄送信件';

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">特小</Button>
      <Button size="sm">小</Button>
      <Button size="default">預設</Button>
      <Button size="lg">大</Button>
      <Button size="icon" aria-label={mailAria}>
        <Mail />
      </Button>
      <Button size="icon-xs" aria-label={mailAria}>
        <Mail />
      </Button>
      <Button size="icon-sm" aria-label={mailAria}>
        <Mail />
      </Button>
      <Button size="icon-lg" aria-label={mailAria}>
        <Mail />
      </Button>
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button disabled>已停用</Button>
      <Button variant="secondary" disabled>
        已停用（次要）
      </Button>
    </div>
  ),
};
