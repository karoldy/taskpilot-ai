import { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@/components/molecules/Table';
import type { IColumn, ITableProps } from '@/components/molecules/Table';
import { SortOrder } from '@/constants/enum';

interface SampleUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  description: string;
}

const columns: IColumn<SampleUser>[] = [
  { key: 'name', title: 'Name', size: { xs: 12, md: 3 }, sortable: true },
  { key: 'email', title: 'Email', size: { xs: 12, md: 3 }, sortable: true },
  { key: 'role', title: 'Role', size: { xs: 6, md: 2 }, sortable: true },
  {
    key: 'description',
    title: 'Description',
    size: { xs: 6, md: 2 },
  },
  {
    key: 'status',
    title: 'Status',
    size: { xs: 6, md: 2 },
    render: (value: unknown) => (
      <Typography variant="body2" color={value === 'active' ? 'success.main' : 'text.disabled'}>
        {String(value)}
      </Typography>
    ),
  },
];

const sampleData: SampleUser[] = [
  {
    id: 1,
    name: 'Alice Chen',
    email: 'alice@example.com',
    role: 'Administrator',
    status: 'active',
    description: 'Senior frontend engineer with 8 years of experience in React and TypeScript',
  },
  {
    id: 2,
    name: 'Bob Wang',
    email: 'bob.wang@example.com',
    role: 'Editor',
    status: 'active',
    description: 'Content editor responsible for product documentation and blog posts',
  },
  {
    id: 3,
    name: 'Carol Liu',
    email: 'carol@example.com',
    role: 'Viewer',
    status: 'inactive',
    description: 'Read-only access for quarterly review',
  },
  {
    id: 4,
    name: 'David Zhang',
    email: 'david.z@example.com',
    role: 'Administrator',
    status: 'active',
    description: 'Backend infrastructure lead, manages deployment pipelines and cloud resources',
  },
  {
    id: 5,
    name: 'Eva Wu',
    email: 'eva.wu@example.com',
    role: 'Editor',
    status: 'inactive',
    description: 'Former design team lead, currently on leave',
  },
];

const meta: Meta<typeof Table<SampleUser>> = {
  title: 'Molecules/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 1000,
          mx: 'auto',
          backgroundColor: 'background.default',
        }}
      >
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    loading: { control: 'boolean' },
    loadingRows: { control: { type: 'number', min: 1, max: 10 } },
    hideHeader: { control: 'boolean' },
    emptyText: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<ITableProps<SampleUser>>;

/** 默认数据展示，带可排序表头，长文本列悬停显示完整 Tooltip */
export const Default: Story = {
  args: {
    columns,
    data: sampleData,
    rowKey: 'id',
  },
};

/** 可排序表格 — 点击表头 Name / Email / Role 切换排序 */
export const Sortable: Story = {
  args: {
    columns,
    data: sampleData,
    rowKey: 'id',
  },
  render: function SortableStory(args) {
    const typedArgs = args as ITableProps<SampleUser>;
    const [sortKey, setSortKey] = useState<string | undefined>(undefined);
    const [sortDirection, setSortDirection] = useState<SortOrder | undefined>(undefined);

    const handleSort = useCallback(
      (key: string) => {
        if (sortKey !== key) {
          setSortKey(key);
          setSortDirection(SortOrder.ASC);
        } else if (sortDirection === SortOrder.ASC) {
          setSortDirection(SortOrder.DESC);
        } else {
          setSortKey(undefined);
          setSortDirection(undefined);
        }
      },
      [sortKey, sortDirection],
    );

    const sortedData = [...typedArgs.data].sort((a, b) => {
      if (!sortKey || !sortDirection) return 0;
      const aVal = String(a[sortKey as keyof SampleUser] ?? '');
      const bVal = String(b[sortKey as keyof SampleUser] ?? '');
      const cmp = aVal.localeCompare(bVal);
      return sortDirection === SortOrder.ASC ? cmp : -cmp;
    });

    return (
      <Table
        {...typedArgs}
        data={sortedData}
        sortKey={sortKey}
        sortOrder={sortDirection}
        onSort={handleSort}
      />
    );
  },
};

/** 加载中状态，显示骨架屏占位 */
export const Loading: Story = {
  args: {
    columns,
    data: [],
    loading: true,
    loadingRows: 4,
  },
};

/** 空数据状态 */
export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyText: 'No users found matching your criteria',
  },
};

/** 隐藏表头的纯数据表格 */
export const WithoutHeader: Story = {
  args: {
    columns,
    data: sampleData,
    hideHeader: true,
    rowKey: 'id',
  },
};
