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
  grpMembers: GroupMember[];
  onEdit: (grpMember: GroupMember) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const COLUMNS = ["Member No", "Role", "Joined", "Updated", "Actions"];
const COLUMN_WIDTHS = ["", "max-w-md", "max-w-md", "max-w-sm", "w-32"];

export function GroupMembersTable({
  grpMembers,
  onEdit,
  onDelete,
  isLoading = false,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: MemberTableProps) {
  if (isLoading) return <LoadingSpinner />;
  const handleRowClick = (grpMember: GroupMember, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) {
      return;
    }
    onEdit(grpMember);
  };

  return (
    <div>
      <TableContainer>
        <table className="min-w-full divide-y">
          <TableHeader columns={COLUMNS} columnWidths={COLUMN_WIDTHS} />
          <tbody className="divide-y">
            {grpMembers.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-6 py-24 text-center">
                  <EmptyState entityName="grpMembers" />
                </td>
              </tr>
            ) : (
              grpMembers.map((grpMember) => (
                <TableRow
                  key={grpMember.id}
                  onClick={(e) => handleRowClick(grpMember, e)}
                >
                  <TableCell className="font-medium">
                    {grpMember.member_no || "-"}
                  </TableCell>
                  <TableCell>{grpMember.role || "Member"}</TableCell>

                  <TableCell className="whitespace-nowrap">
                    {grpMember.joined_at
                      ? formatDateTime(grpMember.joined_at, {
                          useNumericFormat: true,
                        })
                      : "-"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {grpMember.updated_at
                      ? formatDateTime(grpMember.updated_at, {
                          useNumericFormat: true,
                        })
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <TableActions
                      onEdit={() => onEdit(grpMember)}
                      onDelete={() => onDelete(grpMember.id!)}
                      entityType="Member"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </table>
      </TableContainer>

      {grpMembers.length > 0 && (
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
