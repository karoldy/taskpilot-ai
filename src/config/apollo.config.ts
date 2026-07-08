import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { ErrorLink } from '@apollo/client/link/error';
import { SetContextLink } from '@apollo/client/link/context';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import emitter from '@/lib/eventBus';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI || 'http://localhost:3000/graphql',
  credentials: 'include',
});

const authLink = new SetContextLink((prevContext) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...prevContext.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

const errorLink = new ErrorLink(({ error }) => {
  // GraphQL-level errors (parsed from the response body)
  if (CombinedGraphQLErrors.is(error)) {
    for (const err of error.errors) {
      const code = err.extensions?.code as string | undefined;

      // 401 — UNAUTHENTICATED → hard redirect to login
      if (code === 'UNAUTHENTICATED' || err.message?.toLowerCase().includes('unauthorized')) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return;
      }

      // 403 — FORBIDDEN
      if (code === 'FORBIDDEN') {
        emitter.emit('graphql:error:forbidden', { message: err.message });
        continue;
      }

      // 500 — INTERNAL_SERVER_ERROR
      if (code === 'INTERNAL_SERVER_ERROR') {
        emitter.emit('graphql:error:server', { message: err.message });
        continue;
      }
    }
    return;
  }

  // Transport-level error (DNS / CORS / timeout / non-2xx without graph body)
  // Check for HTTP status on plain Error (added by HttpLink for non-2xx responses)
  const statusCode = (error as unknown as Record<string, unknown>).statusCode as number | undefined;

  if (statusCode === 401) {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
    return;
  }
  if (statusCode === 403) {
    emitter.emit('graphql:error:forbidden', { message: error.message });
    return;
  }
  if (statusCode && statusCode >= 500) {
    emitter.emit('graphql:error:server', { message: error.message });
    return;
  }

  emitter.emit('graphql:error:network', { message: error.message });
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

export default apolloClient;
