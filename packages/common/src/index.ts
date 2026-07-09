/**
 * Generic paginated result returned by list queries.
 */
export interface PaginatedResult<T> {
  items: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
}

/**
 * Minimal input shape required by the paginate() helper.
 */
export interface PaginateParams {
  page: number;
  pageSize: number;
}

/**
 * Execute a paginated database query.
 *
 * Runs `findMany` and `count` in parallel and assembles a {@link PaginatedResult}.
 *
 * @param findMany — callback that receives `(skip, take)` and returns the page of items
 * @param count    — callback that returns the total number of matching rows
 * @param params   — `{ page, pageSize }` (page is 1‑based)
 */
export async function paginate<T>(
  findMany: (skip: number, take: number) => Promise<T[]>,
  count: () => Promise<number>,
  params: PaginateParams,
): Promise<PaginatedResult<T>> {
  const { page, pageSize } = params;
  const skip = (page - 1) * pageSize;

  const [items, total] = await Promise.all([findMany(skip, pageSize), count()]);

  return {
    items,
    meta: {
      page,
      pageSize,
      total,
      hasMore: skip + pageSize < total,
    },
  };
}
