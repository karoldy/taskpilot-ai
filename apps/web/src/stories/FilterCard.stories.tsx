import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FilterCard from '@/components/molecules/FilterCard';
import type { IFilterCardProps } from '@/components/molecules/FilterCard';

const meta: Meta<typeof FilterCard> = {
  title: 'Molecules/FilterCard',
  component: FilterCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a2e' },
        { name: 'light', value: '#f7f7f7' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 4 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    count: { control: 'number' },
    error: { control: 'boolean' },
    primary: { control: 'boolean' },
    loading: { control: 'boolean' },
    borderImageSource: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<IFilterCardProps>;

/** 默认状态：显示任务计数 */
export const Default: Story = {
  args: {
    count: 12,
  },
};

/** 选中（Primary）状态：蓝色高亮背景，更高不透明度 */
export const Primary: Story = {
  args: {
    count: 12,
    primary: true,
  },
};

/** 错误状态：红色背景主题 */
export const Error: Story = {
  args: {
    count: 3,
    error: true,
  },
};

/** 错误 + 选中：红色高亮背景 */
export const ErrorPrimary: Story = {
  args: {
    count: 3,
    error: true,
    primary: true,
  },
};

/** 带 Chip 标签 */
export const WithChip: Story = {
  args: {
    count: 8,
    chip: (
      <Chip
        label="Active"
        size="small"
        sx={{
          height: 20,
          fontSize: '0.625rem',
          fontWeight: 600,
          color: 'white',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(8px)',
        }}
      />
    ),
  },
};

/** 带渐变边框 */
export const WithGradientBorder: Story = {
  args: {
    count: 24,
    primary: true,
    borderImageSource: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  },
};

/** 带额外子内容 */
export const WithChildren: Story = {
  args: {
    count: 156,
    primary: true,
    children: (
      <Typography variant="body3" color="text.onColor" sx={{ opacity: 0.7 }}>
        Total tasks across all projects
      </Typography>
    ),
  },
};

/** 带 Chip、渐变边框和子内容的完整示例 */
export const FullFeatured: Story = {
  args: {
    count: 42,
    primary: true,
    error: true,
    borderImageSource: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #ff6b6b 100%)',
    chip: (
      <Chip
        label="Urgent"
        size="small"
        sx={{
          height: 20,
          fontSize: '0.625rem',
          fontWeight: 600,
          color: 'white',
          backgroundColor: 'rgba(255, 100, 100, 0.25)',
          backdropFilter: 'blur(8px)',
        }}
      />
    ),
    children: (
      <Typography variant="body3" color="text.onColor" sx={{ opacity: 0.7 }}>
        Overdue tasks requiring immediate attention
      </Typography>
    ),
  },
};

/** Loading 状态 */
export const Loading: Story = {
  args: {
    count: 0,
    loading: true,
  },
};
