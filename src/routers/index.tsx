import { lazy } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router';
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
    path: '/tasks',
    Component: lazy(() => import('@/modules/task/page/Landing')),
    ErrorBoundary,
  },
];

export default createBrowserRouter(routers);
