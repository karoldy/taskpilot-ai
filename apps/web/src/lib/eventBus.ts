import mitt from 'mitt';
import type { FeedbackPayload } from '@/components/organisms/FeedbackDialog';

/** Application-wide event map */
export type AppEvents = {
  /** Emitted when a login mutation fails */
  'login:error': Partial<FeedbackPayload>;
  /** Emitted when the user successfully logs in */
  'login:success': { accessToken: string };
  /** Emitted when the user logs out */
  logout: void;
  /** GraphQL 401 — session expired / unauthenticated */
  'graphql:error:unauthorized': { message: string };
  /** GraphQL 403 — insufficient permissions */
  'graphql:error:forbidden': Partial<FeedbackPayload>;
  /** GraphQL 500 — internal server error */
  'graphql:error:server': Partial<FeedbackPayload>;
  /** GraphQL network error — cannot reach server / timeout */
  'graphql:error:network': Partial<FeedbackPayload>;
  /** Generic feedback — show a message dialog via FeedbackDialog */
  'feedback:show': Partial<FeedbackPayload>;
  'function:stay:show': Partial<FeedbackPayload>;
};

const emitter = mitt<AppEvents>();

export default emitter;
