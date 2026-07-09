import { create } from 'zustand';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

export interface TaskFilters {
  status: 'all' | 'active' | 'completed';
  sortBy: 'createdAt' | 'title';
  order: 'asc' | 'desc';
}

interface TaskState {
  tasks: Task[];
  filters: TaskFilters;
  isLoading: boolean;

  // Actions
  addTask: (title: string, description?: string) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, data: Partial<Pick<Task, 'title' | 'description'>>) => void;
  setFilters: (filters: Partial<TaskFilters>) => void;

  // Selectors
  filteredTasks: () => Task[];
  taskCount: () => { total: number; active: number; completed: number };
}

let nextId = 1;
const generateId = () => String(nextId++);

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filters: {
    status: 'all',
    sortBy: 'createdAt',
    order: 'desc',
  },
  isLoading: false,

  addTask: (title, description = '') => {
    const task: Task = {
      id: generateId(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    };
    set((state) => ({ tasks: [...state.tasks, task] }));
  },

  removeTask: (id) => {
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
  },

  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    }));
  },

  updateTask: (id, data) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...data } : t)),
    }));
  },

  setFilters: (filters) => {
    set((state) => ({ filters: { ...state.filters, ...filters } }));
  },

  filteredTasks: () => {
    const { tasks, filters } = get();
    let result = [...tasks];

    if (filters.status === 'active') {
      result = result.filter((t) => !t.completed);
    } else if (filters.status === 'completed') {
      result = result.filter((t) => t.completed);
    }

    result.sort((a, b) => {
      const compare =
        filters.sortBy === 'createdAt' ? a.createdAt - b.createdAt : a.title.localeCompare(b.title);
      return filters.order === 'asc' ? compare : -compare;
    });

    return result;
  },

  taskCount: () => {
    const { tasks } = get();
    return {
      total: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    };
  },
}));
