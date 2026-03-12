interface TableContainerProps {
  children: React.ReactNode;
}

export function TableContainer({ children }: TableContainerProps) {
  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      {children}
    </div>
  );
}

interface TableHeaderProps {
  columns: string[];
  columnWidths?: string[];
}

export function TableHeader({ columns, columnWidths = [] }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th
            key={column}
            className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
              columnWidths[index] || ''
            }`}
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
}

interface TableRowProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  className?: string;
}

export function TableRow({ children, onClick, className = "" }: TableRowProps) {
  return (
    <tr 
      className={`hover:bg-gray-50 transition-colors ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export function TableCell({ children, className = '' }: TableCellProps) {
  return (
    <td className={`px-3 py-1 text-sm ${className}`}>
      {children}
    </td>
  );
}
