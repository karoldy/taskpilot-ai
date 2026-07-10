import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { ErrorLink } from '@apollo/client/link/error';
import { SetContextLink } from '@apollo/client/link/context';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import emitter from '@/lib/eventBus';
import { getAccessToken } from '@/lib/auth';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI || 'http://localhost:3000/graphql',
  credentials: 'include',
});

const authLink = new SetContextLink((prevContext) => {
  const token = getAccessToken();
  return {
    headers: {
      ...prevContext.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    for (const err of error.errors) {
      const code = err.extensions?.code as string | undefined;
      if (code === 'BAD_REQUEST') {
        emitter.emit('login:error', {});
        continue;
      }
      // 401 — UNAUTHENTICATED → hard redirect to login
      if (code === 'UNAUTHENTICATED' || err.message?.toLowerCase().includes('unauthorized')) {
        continue;
      }

      // 403 — FORBIDDEN
      if (code === 'FORBIDDEN') {
        continue;
      }

      // 500 — INTERNAL_SERVER_ERROR
      if (code === 'INTERNAL_SERVER_ERROR') {
        continue;
      }
    }
    return;
  }

  // Transport-level error (DNS / CORS / timeout / non-2xx without graph body)
  // Check for HTTP status on plain Error (added by HttpLink for non-2xx responses)
  // const statusCode = (error as unknown as Record<string, unknown>).statusCode as number | undefined;

  // if (statusCode === 401) {
  //   localStorage.removeItem('accessToken');
  //   window.location.href = '/login';
  //   return;
  // }
  // if (statusCode === 403) {
  //   emitter.emit('graphql:error:forbidden', { subtitle: error.message });
  //   return;
  // }
  // if (statusCode && statusCode >= 500) {
  //   emitter.emit('graphql:error:server', { subtitle: error.message });
  //   return;
  // }

  emitter.emit('graphql:error:network', { subtitle: error.message });
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
