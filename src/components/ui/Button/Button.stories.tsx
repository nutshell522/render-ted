import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './Button';

const meta: Meta<typeof Button<'button'>> = {
  title: 'Components/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    as: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button<'button'>>;

export const PrimaryButton: Story = {
  args: {
    children: '測試',
    variant: 'primary',
  },
};

export const SecondaryButton: Story = {
  args: {
    children: '測試',
    variant: 'secondary',
  },
};

export const LinkButton: StoryObj<typeof Button<'a'>> = {
  args: {
    as: 'a',
    href: 'https://google.com',
    target: '_blank',
    children: '我是連結',
  },
};
