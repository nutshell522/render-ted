import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AnimatedTed } from './animated-ted';

const meta: Meta<typeof AnimatedTed> = {
  title: 'Components/Composites/AnimatedTed',
  component: AnimatedTed,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AnimatedTed>;

// 預設比例（100%）
export const Default: Story = {
  args: { scale: 1 },
};

// 縮小展示（可對照 BouncingShape 的 SingleLetter story）
export const ScaledDown: Story = {
  args: { scale: 0.8 },
};
