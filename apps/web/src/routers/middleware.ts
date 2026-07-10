import type { MiddlewareFunction } from "react-router";
import { redirect } from "react-router";
import { isAuthenticated } from '@/lib/auth';

export const authMiddleware: MiddlewareFunction = async ({ request }, next) => {
  const url = new URL(request.url);
  const isLoginPage = url.pathname === '/login';
  const isHealthcheck = url.pathname === '/healthcheck';
  if (!isAuthenticated() && !isLoginPage && !isHealthcheck) {
    throw redirect(`/login?${url.searchParams.toString()}`);
  }
  return next();
};

export const timingMiddleware: MiddlewareFunction = async (_, next) => {
  console.time();
  await next();
  console.timeEnd();
}
