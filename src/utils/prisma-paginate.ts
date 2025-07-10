import { BaseQueryParams, BasePaginatedResponse } from 'src/types/base-query';

export async function prismaPaginate<T>(
  model: {
    findMany: Function;
    count: Function;
  },
  params: BaseQueryParams,
  where: any = {},
  options: {
    include?: any;
    select?: any;
  } = {},
): Promise<BasePaginatedResponse<T>> {
  const { page, pageSize, orderBy = 'id', ascending = true } = params;

  const [data, total] = await Promise.all([
    model.findMany({
      where,
      orderBy: { [orderBy]: ascending ? 'asc' : 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      ...options,
    }),
    model.count({ where }),
  ]);

  return { data, total };
}
