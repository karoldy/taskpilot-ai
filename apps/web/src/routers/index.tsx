import { lazy } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';
import { authMiddleware } from "@/routers/middleware";
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
    middleware: [authMiddleware],
    children: [
      {
        Component: lazy(() => import('@/components/layouts')),
        children: [
          {
            path: 'projects',
            Component: lazy(() => import('@/views/project/Landing')),
          },
          {
            path: 'tasks',
            Component: lazy(() => import('@/views/task/Landing')),
          },
        ],
      },
    ],
  },
];

export default createBrowserRouter(routers);
