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
    path: '/',
    ErrorBoundary,
    hasErrorBoundary: true,
    children: [
      {
        Component: lazy(() => import('@/components/layout')),
        children: [
          {
            path: '/tasks',
            Component: lazy(() => import('@/modules/task/page/Landing')),
          },
        ],
      },
    ],
  },
];

export default createBrowserRouter(routers);
