import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AnimatedTed } from './AnimatedTed';

const meta: Meta<typeof AnimatedTed> = {
  title: 'Components/Animations/AnimatedCounter',
  component: AnimatedTed,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AnimatedTed>;

// 預設狀態 (100% 原比例)
export const Default: Story = {
  args: { scale: 1 },
};

// 縮小狀態 (取代原本的 SingleLetter)
export const ScaledDown: Story = {
  args: { scale: 0.8 },
};
