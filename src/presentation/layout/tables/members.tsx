"use client";

import { TableHeader, TableRow } from "../../components/tables/table-parts";
import { TableCell, TableContainer } from "../../components/tables/table-parts";
import { Pagination } from "../../components/tables/pagination";
import { Member } from "@/domain/entities";
import LoadingSpinner from "../../components/ui/states/loading-spinner";
import { formatDateTime } from "@/application/helpers/utils";
import { TableActions } from "../../components/tables/table-actions";
import { EmptyState } from "../../components/ui/states/empty-state";

interface MemberTableProps {
  members: Member[];
  onEdit: (member: Member) => void;
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

export function MemberTable({
  members,
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
  const handleRowClick = (member: Member, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) {
      return;
    }
    onEdit(member);
  };

  return (
    <div>
      <TableContainer>
        <table className="min-w-full divide-y">
          <TableHeader columns={COLUMNS} columnWidths={COLUMN_WIDTHS} />
          <tbody className="divide-y">
            {members.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-6 py-24 text-center">
                  <EmptyState entityName="members" />
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <TableRow
                  key={member.id}
                  onClick={(e) => handleRowClick(member, e)}
                >
                  <TableCell className="font-medium">
                    {member.member_no || "-"}
                  </TableCell>
                  <TableCell>{member.role || "Member"}</TableCell>

                  <TableCell className="whitespace-nowrap">
                    {member.joined_at
                      ? formatDateTime(member.joined_at, {
                          useNumericFormat: true,
                        })
                      : "-"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {member.updated_at
                      ? formatDateTime(member.updated_at, {
                          useNumericFormat: true,
                        })
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <TableActions
                      onEdit={() => onEdit(member)}
                      onDelete={() => onDelete(member.id!)}
                      entityType="Member"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </table>
      </TableContainer>

      {members.length > 0 && (
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
