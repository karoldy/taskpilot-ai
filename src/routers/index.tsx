import { lazy } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';
import ErrorBoundary from '@/components/layout/ErrorBoundary';

const routers: RouteObject[] = [
  {
    path: '*',
    Component: lazy(() => import('@/components/layout/NotFound')),
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
    Component: lazy(() => import('@/modules/auth/pages/Login')),
    ErrorBoundary,
    hasErrorBoundary: true,
  },
  {
    path: '/',
    ErrorBoundary,
    hasErrorBoundary: true,
    children: [
      {
        Component: lazy(() => import('@/components/layout')),
        children: [
          {
            path: 'projects',
            Component: lazy(() => import('@/modules/project/pages/Landing')),
          },
          {
            path: 'tasks',
            Component: lazy(() => import('@/modules/task/pages/Landing')),
          },
        ],
      },
    ],
  },
];

export default createBrowserRouter(routers);
