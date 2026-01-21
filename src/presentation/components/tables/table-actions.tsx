import { AlertDialog } from '../dialogs/alert-dialog';
import { Pencil, Trash2 } from 'lucide-react';

interface TableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  entityType: string;
}

export function TableActions({ onEdit, onDelete, entityType }: TableActionsProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onEdit}
        className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
        title={`Edit ${entityType}`}
      >
        <Pencil size={16} />
      </button>
      <AlertDialog
        trigger={
          <button 
            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
            title={`Delete ${entityType}`}
          >
            <Trash2 size={16} />
          </button>
        }
        title={`Delete ${entityType}`}
        description={`Are you sure you want to delete this ${entityType}? This action cannot be undone.`}
        onConfirm={onDelete}
      />
    </div>
  );
}