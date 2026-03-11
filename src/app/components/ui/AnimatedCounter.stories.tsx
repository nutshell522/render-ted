import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import AnimatedCounter from './AnimatedCounter';

const meta: Meta<typeof AnimatedCounter> = {
  title: 'UI/AnimatedCounter',
  component: AnimatedCounter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    targetValue: { control: { type: 'number', min: 0 } },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedCounter>;

// 基本用法
export const Default: Story = {
  args: {
    targetValue: 100,
    duration: 1,
    suffix: '+',
  },
};

// 測試大數字
export const LargeNumber: Story = {
  args: {
    targetValue: 9999,
    duration: 2,
    suffix: ' points',
  },
};

// 快速跳動
export const Fast: Story = {
  args: {
    targetValue: 50,
    duration: 0.3,
  },
};
