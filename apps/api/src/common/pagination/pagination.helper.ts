import { PaginationArgs } from './pagination.args';

export interface PaginatedResult<T> {
  items: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
}

export async function paginate<T>(
  findMany: (skip: number, take: number) => Promise<T[]>,
  count: () => Promise<number>,
  args: PaginationArgs,
): Promise<PaginatedResult<T>> {
  const { page, pageSize } = args;
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
