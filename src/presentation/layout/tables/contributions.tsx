"use client";

import { useRouter } from "next/navigation";
import { TableHeader, TableRow } from "../../components/tables/table-parts";
import { TableCell, TableContainer } from "../../components/tables/table-parts";
import { Pagination } from "../../components/tables/pagination";
import { GroupContribution } from "@/domain/entities";
import LoadingSpinner from "../../components/ui/states/loading-spinner";
import { formatDateTime } from "@/application/helpers/utils";
import { TableActions } from "../../components/tables/table-actions";
import { EmptyState } from "../../components/ui/states/empty-state";

interface ContributionTableProps {
  records: GroupContribution[];
  onEdit: (record: GroupContribution) => void;
  onMore: (id: string) => void;
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const COLUMNS = [
  "Full Name",
  "Reason",
  "Mode",
  "Reference",
  "Status",
  "Amount",
  "Paid",
  "Actions",
];
const COLUMN_WIDTHS = [
  "max-w-md",
  "max-w-md",
  "w-16",
  "w-32",
  "w-16",
  "w-32",
  "w-32",
  "w-16",
];

export function ContributionsTable({
  records,
  onEdit,
  onMore,
  isLoading = false,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: ContributionTableProps) {
  const router = useRouter();

  if (isLoading) return <LoadingSpinner />;

  const handleRowClick = (record: GroupContribution, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) {
      return;
    }
    router.push(`/contributions/${record.id}`);
  };

  return (
    <div>
      <TableContainer>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <TableHeader columns={COLUMNS} columnWidths={COLUMN_WIDTHS} />
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {records.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-6 py-24 text-center">
                  <EmptyState entityName="grpContributions" />
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <TableRow
                  key={record.id}
                  onClick={(e) => handleRowClick(record, e)}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors"
                >
                  <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                    {record.full_name || "Member"}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {record.reason || "-"}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {record.mode || "-"}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {record.reference || "-"}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {record.status || "-"}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {record.amount || "0"}
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {record.created_at
                      ? formatDateTime(record.created_at, {
                          useNumericFormat: true,
                        })
                      : ""}
                  </TableCell>
                  <TableCell>
                    <TableActions
                      onEdit={() => onEdit(record)}
                      onMore={() => onMore(record.id!)}
                      entityType="Contribution"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </table>
      </TableContainer>

      {records.length > pageSize && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}