import mitt from 'mitt';

/** Application-wide event map */
export type AppEvents = {
  /** Emitted when a login mutation fails */
  'login:error': { message: string };
  /** Emitted when the user successfully logs in */
  'login:success': { accessToken: string };
  /** Emitted when the user logs out */
  logout: void;
  /** GraphQL 401 — session expired / unauthenticated */
  'graphql:error:unauthorized': { message: string };
  /** GraphQL 403 — insufficient permissions */
  'graphql:error:forbidden': { message: string };
  /** GraphQL 500 — internal server error */
  'graphql:error:server': { message: string };
  /** GraphQL network error — cannot reach server / timeout */
  'graphql:error:network': { message: string };
};

const emitter = mitt<AppEvents>();

export default emitter;
