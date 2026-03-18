"use client";

import { useRouter } from "next/navigation";
import { TableHeader, TableRow } from "../../components/tables/table-parts";
import { TableCell, TableContainer } from "../../components/tables/table-parts";
import { Pagination } from "../../components/tables/pagination";
import { GroupMember } from "@/domain/entities";
import LoadingSpinner from "../../components/ui/states/loading-spinner";
import { formatDateTime } from "@/application/helpers/utils";
import { TableActions } from "../../components/tables/table-actions";
import { EmptyState } from "../../components/ui/states/empty-state";

interface MemberTableProps {
  records: GroupMember[];
  onEdit: (record: GroupMember) => void;
  onMore: (id: string) => void;
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const COLUMNS = [
  "No",
  "Full Name",
  "Role",
  "ID. No",
  "Sex",
  "Phone",
  "Email",
  "Dates",
  "Actions",
];
const COLUMN_WIDTHS = [
  "w-10",
  "max-w-md",
  "w-16",
  "w-32",
  "w-16",
  "max-w-md",
  "max-w-md",
  "w-32",
  "w-16",
];

export function MembersTable({
  records,
  onEdit,
  onMore,
  isLoading = false,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: MemberTableProps) {
  const router = useRouter();

  if (isLoading) return <LoadingSpinner />;

  const handleRowClick = (record: GroupMember, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) {
      return;
    }
    router.push(`/members/${record.member_no}`);
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
                  <EmptyState entityName="members" />
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <TableRow
                  key={record.member_id}
                  onClick={(e) => handleRowClick(record, e)}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors"
                >
                  <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                    {record.member_no || "-"}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {record.full_name}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {record.role || "Member"}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {record.id_number || "-"}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {record.sex || "-"}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {record.phone || "-"}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {record.email || "-"}
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-gray-700 dark:text-gray-300">
                    Joined:{" "}
                    {record.joined_at
                      ? formatDateTime(record.joined_at, {
                          useNumericFormat: true,
                        })
                      : ""}
                    <br />
                    Updated:{" "}
                    {record.updated_at
                      ? formatDateTime(record.updated_at, {
                          useNumericFormat: true,
                        })
                      : ""}
                  </TableCell>
                  <TableCell>
                    <TableActions
                      onEdit={() => onEdit(record)}
                      onMore={() => onMore(record.member_id!)}
                      entityType="Member"
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