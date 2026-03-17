import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BouncingShape } from './BouncingShape';

const meta: Meta<typeof BouncingShape> = {
  title: 'Components/Shapes/BouncingShape',
  component: BouncingShape,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100px', height: '100px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BouncingShape>;

export const SingleLetter: Story = {
  args: {
    letter: 'A',
    letterY: -40,
    delay: 0,
    shouldAnimate: true,
    children: <rect x="-40" y="-80" width="80" height="80" rx="8" fill="#111827" />,
  },
};

export const Disabled: Story = {
  args: {
    ...SingleLetter.args,
    shouldAnimate: false,
  },
};
