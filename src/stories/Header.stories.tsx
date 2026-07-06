import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from '@/components/layout/Header';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const WithContent: Story = {
  args: {
    children: (
      <Box sx={{ position: 'relative', zIndex: 1, p: 4 }}>
        <Typography variant="heading1" color="text.onColor">
          Task Management
        </Typography>
      </Box>
    ),
  },
};
