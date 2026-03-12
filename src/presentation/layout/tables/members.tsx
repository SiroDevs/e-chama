"use client";

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
  if (isLoading) return <LoadingSpinner />;
  const handleRowClick = (record: GroupMember, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) {
      return;
    }
    onEdit(record);
  };

  return (
    <div>
      <TableContainer>
        <table className="min-w-full divide-y">
          <TableHeader columns={COLUMNS} columnWidths={COLUMN_WIDTHS} />
          <tbody className="divide-y">
            {records.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-6 py-24 text-center">
                  <EmptyState entityName="grpMembers" />
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <TableRow
                  key={record.id}
                  onClick={(e) => handleRowClick(record, e)}
                >
                  <TableCell className="font-medium">
                    {record.member_no || "-"}
                  </TableCell>
                  <TableCell>{record.full_name}</TableCell>
                  <TableCell>{record.role || "Member"}</TableCell>
                  <TableCell>{record.id_number || "-"}</TableCell>
                  <TableCell>{record.sex || "-"}</TableCell>
                  <TableCell>{record.phone || "-"}</TableCell>
                  <TableCell>{record.email || "-"}</TableCell>

                  <TableCell className="whitespace-nowrap">
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
                      onMore={() => onMore(record.id!)}
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
