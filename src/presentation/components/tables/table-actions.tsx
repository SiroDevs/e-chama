import { Pencil, MoreVertical } from 'lucide-react';

interface TableActionsProps {
  onEdit: () => void;
  onMore: () => void;
  entityType: string;
}

export function TableActions({ onEdit, onMore, entityType }: TableActionsProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onEdit}
        className="p-2 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
        title={`Edit ${entityType}`}
      >
        <Pencil size={16} />
      </button>
      
      <button
        onClick={onMore}
        className="p-2 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
        title={`Edit ${entityType}`}
      >
        <MoreVertical size={16} />
      </button>
      {/* <AlertDialog
        trigger={
          <button 
            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
            title={`Delete ${entityType}`}
          >
            <MoreVertical size={16} />
          </button>
        }
        title={`Delete ${entityType}`}
        description={`Are you sure you want to delete this ${entityType}? This action cannot be undone.`}
        onConfirm={onDelete}
      /> */}
    </div>
  );
}