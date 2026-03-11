interface TableContainerProps {
  children: React.ReactNode;
}

export function TableContainer({ children }: TableContainerProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg border shadow-sm">
      {children}
    </div>
  );
}