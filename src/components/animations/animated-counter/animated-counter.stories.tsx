import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AnimatedCounter } from './animated-counter';

const meta: Meta<typeof AnimatedCounter> = {
  title: 'Components/Animations/AnimatedCounter',
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

// 基本展示
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

// 短時間內跑完動畫
export const Fast: Story = {
  args: {
    targetValue: 50,
    duration: 0.3,
  },
};
