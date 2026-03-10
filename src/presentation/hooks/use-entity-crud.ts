import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CrudUseCase } from '@/application/usecases/crud.usecase';
import { EntityType } from '@/application/entities';

export function useEntityCrud<T>(useCase: CrudUseCase<T>, entityType: EntityType) {
  const queryClient = useQueryClient();

  const { data: entities, isLoading, error } = useQuery({
    queryKey: [entityType],
    queryFn: () => useCase.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<T, 'rid' | 'createdAt' | 'updatedAt'>) => 
      useCase.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityType] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<T> }) =>
      useCase.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityType] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => useCase.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityType] });
    },
  });

  return {
    entities: entities || [],
    isLoading,
    error,
    createEntity: createMutation.mutateAsync,
    updateEntity: updateMutation.mutateAsync,
    deleteEntity: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}