import { CrudUseCase } from '@/application/use-cases/supabase/crud.usecase';
import { PaginationOptions } from '@/domain/repositories/supabase/base.repo';
import { EntityType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function usePaginatedEntity<T>(
  useCase: CrudUseCase<T>,
  entityType: EntityType,
  paginationOptions: PaginationOptions
) {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    isFetching
  } = useQuery({
    queryKey: [entityType, 'paginated', paginationOptions],
    queryFn: () => useCase.getAllPaginated(paginationOptions),
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<T, 'id' | 'created_at' | 'updated_at'>) =>
      useCase.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityType, 'paginated'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<T> }) =>
      useCase.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityType, 'paginated'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => useCase.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityType, 'paginated'] });
    },
  });

  return {
    entities: data?.data || [],
    pagination: data ? {
      total: data.total,
      page: data.page,
      pageSize: data.pageSize,
      totalPages: data.totalPages,
    } : {
      total: 0,
      page: paginationOptions.page,
      pageSize: paginationOptions.pageSize,
      totalPages: 0,
    },
    isLoading,
    isFetching,
    error: error as Error | null,
    createEntity: createMutation.mutateAsync,
    updateEntity: updateMutation.mutateAsync,
    deleteEntity: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}