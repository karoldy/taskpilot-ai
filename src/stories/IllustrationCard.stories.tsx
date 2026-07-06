import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import IllustrationCard from '@/components/molecules/IllustrationCard';
import type { IIllustrationCardProps } from '@/components/molecules/IllustrationCard';

const meta: Meta<typeof IllustrationCard> = {
  title: 'Molecules/IllustrationCard',
  component: IllustrationCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f7f7f7' },
        { name: 'dark', value: '#2f2f2f' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'error'],
    },
    type: {
      control: 'select',
      options: ['Complete', 'Empty', 'Error', 'Warm'],
    },
    size: {
      control: 'number',
    },
    loading: {
      control: 'boolean',
    },
    onOk: { action: 'ok' },
    onCancel: { action: 'cancel' },
  },
};

export default meta;
type Story = StoryObj<IIllustrationCardProps>;

/** 信息提示型，通常用于确认对话框 */
export const Info: Story = {
  args: {
    variant: 'info',
    type: 'Warm',
    size: 80,
    name: 'Warm_Delete',
    title: 'Confirm Logout',
    subtitle: 'Are you sure you want to logout',
    okText: 'Logout',
    cancelText: 'Cancel',
  },
};

/** 成功提示型，通常用于操作完成后的反馈 */
export const Success: Story = {
  args: {
    variant: 'success',
    type: 'Complete',
    size: 80,
    name: 'Complete_Task',
    title: 'Task Created',
    subtitle: 'The task has been created successfully',
    okText: 'Done',
  },
};

/** 错误提示型，通常用于异常状态的反馈 */
export const Error: Story = {
  args: {
    variant: 'error',
    type: 'Error',
    size: 80,
    name: 'Error_Action',
    title: 'Operation Failed',
    subtitle: 'Something went wrong. Please try again',
    okText: 'Retry',
    cancelText: 'Cancel',
  },
};

/** 仅标题，无图片和操作按钮 */
export const TitleOnly: Story = {
  args: {
    title: 'No Results Found',
  },
};

/** 含错误码 */
export const WithCode: Story = {
  args: {
    variant: 'error',
    type: 'Error',
    size: 80,
    name: 'Error_Action',
    title: 'Server Error',
    subtitle: 'An unexpected error occurred',
    code: '500',
    okText: 'Retry',
    cancelText: 'Cancel',
  },
};

/** Loading 状态：确认按钮显示加载动画 */
export const Loading: Story = {
  args: {
    variant: 'success',
    type: 'Complete',
    size: 80,
    name: 'Complete_Action',
    title: 'Saving...',
    subtitle: 'Please wait while we save your changes',
    okText: 'Save',
    loading: true,
  },
};

/** 无图片，仅文本和按钮 */
export const NoImage: Story = {
  args: {
    variant: 'info',
    title: 'Delete Item',
    subtitle: 'This action cannot be undone',
    okText: 'Delete',
    cancelText: 'Cancel',
  },
};
