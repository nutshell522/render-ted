import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Mail } from 'lucide-react';

import { Button } from './Button';

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
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="default">Default</Button>
      <Button size="lg">LG</Button>
      <Button size="icon" aria-label="寄送信件">
        <Mail />
      </Button>
      <Button size="icon-xs" aria-label="寄送信件">
        <Mail />
      </Button>
      <Button size="icon-sm" aria-label="寄送信件">
        <Mail />
      </Button>
      <Button size="icon-lg" aria-label="寄送信件">
        <Mail />
      </Button>
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button disabled>Disabled</Button>
      <Button variant="secondary" disabled>
        Disabled Secondary
      </Button>
    </div>
  ),
};
