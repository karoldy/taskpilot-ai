import type { Meta, StoryObj } from '@storybook/react-vite';
import Footer from '@/components/layouts/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};

export const WithChildren: Story = {
  args: {
    children: '© 2025 TaskPilot AI',
  },
};
