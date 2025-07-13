import type {
  BaseQueryParams,
  BasePaginatedResponse,
} from 'src/types/base-query';

export async function prismaPaginate<
  TModel,
  TFindArgs extends {
    where?: object;
    orderBy?: object;
    include?: object;
    select?: object;
  } = {
    where?: object;
    orderBy?: object;
    include?: object;
    select?: object;
  },
>(
  model: {
    findMany: (args: TFindArgs) => Promise<TModel[]>;
    count: (args: Pick<TFindArgs, 'where'>) => Promise<number>;
  },
  params: BaseQueryParams,
  where: NonNullable<TFindArgs['where']> = {} as NonNullable<
    TFindArgs['where']
  >,
  options: Omit<TFindArgs, 'where' | 'orderBy' | 'skip' | 'take'> = {} as Omit<
    TFindArgs,
    'where' | 'orderBy' | 'skip' | 'take'
  >,
): Promise<BasePaginatedResponse<TModel>> {
  const { page, pageSize, orderBy = 'id', ascending = true } = params;

  const args = {
    where,
    orderBy: { [orderBy]: ascending ? 'asc' : 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
    ...options,
  } as unknown as TFindArgs;

  const [data, total] = await Promise.all([
    model.findMany(args),
    model.count({ where }),
  ]);

  return { data, total };
}
