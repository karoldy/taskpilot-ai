import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import tokens from '@/tokens/base';
import Navbar from '@/components/layouts/Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Layout/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/tasks']}>
        <Box sx={{ minHeight: '200vh', backgroundColor: tokens.colorBackgroundPagePrimary }}>
          <Story />
          <Box sx={{ p: 4, pt: '80px' }}>
            <Typography>Scroll down to see the navbar effect</Typography>
          </Box>
        </Box>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};
