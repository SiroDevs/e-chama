interface EmptyStateProps {
  entityName: string;
}

export function EmptyState({ entityName }: EmptyStateProps) {
  return (
    <div className="text-center py-8 text-gray-500">
      No {entityName} found
    </div>
  );
}
