export const Locale = {
  EN: 'en',
  SC: 'sc',
  TC: 'tc',
} as const;

export type Locale = (typeof Locale)[keyof typeof Locale];

export const Language = {
  [Locale.EN]: 'en',
  [Locale.SC]: 'sc',
  [Locale.TC]: 'tc',
} as const;

export const PageSize = {
  Level12: 12,
  Level24: 24,
  Level36: 36,
  Level48: 48,
} as const;

export type PageSize = (typeof PageSize)[keyof typeof PageSize];

export const SortOrder = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

export const JobStatus = {
  Pending: 'pending',
  Running: 'running',
  Succeeded: 'succeeded',
  Failed: 'failed',
} as const;

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];
