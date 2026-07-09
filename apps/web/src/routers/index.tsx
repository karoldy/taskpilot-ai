import { lazy } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';
import ErrorBoundary from '@/components/layouts/ErrorBoundary';

const routers: RouteObject[] = [
  {
    path: '*',
    Component: lazy(() => import('@/components/layouts/NotFound')),
    ErrorBoundary,
  },
  {
    path: '/healthcheck',
    loader: () => new Response('OK', { status: 200 }),
    ErrorBoundary,
  },
  {
    path: '/',
    element: <Navigate to="/tasks" />,
  },
  {
    path: '/login',
    // HydrateFallback: () => <LinearProgress />,
    Component: lazy(() => import('@/views/auth/login')),
    ErrorBoundary,
    hasErrorBoundary: true,
  },
  {
    path: '/',
    ErrorBoundary,
    hasErrorBoundary: true,
    children: [
      {
        Component: lazy(() => import('@/components/layouts')),
        children: [
          {
            path: 'tasks',
            Component: lazy(() => import('@/views/task/landing')),
          },
        ],
      },
    ],
  },
];

export default createBrowserRouter(routers);
