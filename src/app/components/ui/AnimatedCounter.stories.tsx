import type { Meta, StoryObj } from '@storybook/react';

import AnimatedCounter from './AnimatedCounter';

const meta: Meta<typeof AnimatedCounter> = {
  title: 'UI/AnimatedCounter', // 在 Storybook 側欄顯示的分類層級
  component: AnimatedCounter,
  parameters: {
    layout: 'centered', // 讓元件在預覽視窗居中
  },
  tags: ['autodocs'], // 自動生成文件頁面
  argTypes: {
    // 這裡可以定義 Control 面板的行為（例如顏色選擇器）
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
