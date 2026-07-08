import { useEffect, type FC, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import TaskLandingPage from '@/modules/task/pages/Landing';
import { useTaskStore, type Task } from '@/stores/useTaskStore';

const defaultFilters = {
  status: 'all' as const,
  sortBy: 'createdAt' as const,
  order: 'desc' as const,
};

/** Helper to seed the Zustand store before rendering and reset on unmount */
const StoreSeeder: FC<{ tasks: Task[]; children: ReactNode }> = ({ tasks, children }) => {
  useEffect(() => {
    useTaskStore.setState({ tasks, filters: defaultFilters, isLoading: false });
    return () => {
      useTaskStore.setState({ tasks: [], filters: defaultFilters, isLoading: false });
    };
  }, [tasks]);
  return <>{children}</>;
};

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Design new onboarding flow',
    description:
      'Create wireframes and high-fidelity mockups for the new user onboarding experience',
    completed: false,
    createdAt: 1717776000000,
  },
  {
    id: '2',
    title: 'Implement task filtering API',
    description: 'Build REST endpoints for filtering tasks by status, date, and assignee',
    completed: false,
    createdAt: 1717862400000,
  },
  {
    id: '3',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    completed: true,
    createdAt: 1717689600000,
  },
  {
    id: '4',
    title: 'Write unit tests for auth module',
    description: 'Achieve 80%+ coverage on authentication service and middleware',
    completed: true,
    createdAt: 1717603200000,
  },
  {
    id: '5',
    title: 'Review pull request #42',
    description: 'Code review for the dashboard refactoring PR',
    completed: false,
    createdAt: 1717948800000,
  },
  {
    id: '6',
    title: 'Update project dependencies',
    description: 'Audit and upgrade outdated npm packages to latest stable versions',
    completed: true,
    createdAt: 1717516800000,
  },
];

const manyTasks: Task[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  title: `Task ${i + 1} — ${['Design', 'Implement', 'Review', 'Test', 'Deploy'][i % 5]} ${['API', 'UI', 'Database', 'Auth', 'Docs'][i % 5]}`,
  description: `Description for task ${i + 1}. This is a sample task to demonstrate list rendering.`,
  completed: i % 3 === 0,
  createdAt: Date.now() - (20 - i) * 86400000,
}));

const meta: Meta<typeof TaskLandingPage> = {
  title: 'Pages/TaskLanding',
  component: TaskLandingPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

/** 默认状态：展示混合了进行中和已完成的任务列表 */
export const Default: Story = {
  render: () => (
    <StoreSeeder tasks={sampleTasks}>
      <TaskLandingPage />
    </StoreSeeder>
  ),
};

/** 空任务列表：展示空状态提示 */
export const Empty: Story = {
  render: () => (
    <StoreSeeder tasks={[]}>
      <TaskLandingPage />
    </StoreSeeder>
  ),
};

/** 仅进行中的任务（无已完成任务） */
export const AllActive: Story = {
  render: () => (
    <StoreSeeder tasks={sampleTasks.filter((t) => !t.completed)}>
      <TaskLandingPage />
    </StoreSeeder>
  ),
};

/** 仅已完成的任务 */
export const AllCompleted: Story = {
  render: () => (
    <StoreSeeder tasks={sampleTasks.filter((t) => t.completed)}>
      <TaskLandingPage />
    </StoreSeeder>
  ),
};

/** 大量任务：验证列表滚动和性能 */
export const ManyTasks: Story = {
  render: () => (
    <StoreSeeder tasks={manyTasks}>
      <TaskLandingPage />
    </StoreSeeder>
  ),
};

/** 移动端视口：验证响应式布局 */
export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: 'xs' },
  },
  render: () => (
    <StoreSeeder tasks={sampleTasks}>
      <TaskLandingPage />
    </StoreSeeder>
  ),
};

/** 平板视口 */
export const TabletView: Story = {
  parameters: {
    viewport: { defaultViewport: 'md' },
  },
  render: () => (
    <StoreSeeder tasks={sampleTasks}>
      <TaskLandingPage />
    </StoreSeeder>
  ),
};
