import { GroupContribution } from "@/domain/entities";
import Link from "next/link";

interface RecentContributionsProps {
  contributions: GroupContribution[];
  periodDays?: number;
  isMember?: boolean;
}

function formatAmount(amount: number): string {
  return amount.toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status?: string }) {
  const s = status?.toLowerCase() ?? "pending";

  const styles: Record<string, { bg: string; color: string }> = {
    approved: { bg: "#1a3a2a", color: "#4ade80" },
    pending: { bg: "#3a2e1a", color: "#f59e0b" },
    rejected: { bg: "#3a1a1a", color: "#f87171" },
  };

  const { bg, color } = styles[s] ?? styles["pending"];

  return (
    <span
      style={{
        background: bg,
        color,
        fontSize: "11px",
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: "999px",
        textTransform: "capitalize" as const,
        letterSpacing: "0.02em",
      }}
    >
      {status ?? "Pending"}
    </span>
  );
}

export function RecentContributions({
  contributions,
  periodDays = 30,
  isMember = false,
}: RecentContributionsProps) {
  return (
    <div
      className="border border-gray-200 dark:border-gray-800 p-5 rounded-lg"
      style={{
        borderRadius: "16px",
        padding: "24px 20px",
        width: "100%",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        boxSizing: "border-box" as const,
      }}
    >
      <p
        style={{
          fontSize: "18px",
          fontWeight: 700,
          margin: "0 0 4px 0",
          letterSpacing: "-0.01em",
        }}
      >
        Recent contributions
      </p>
      <p style={{ fontSize: "13px", color: "#888", margin: "0 0 20px 0" }}>
        Last {periodDays} days
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          marginBottom: "24px",
        }}
      >
        {contributions.map((c, index) => (
          <div
            key={c.id ?? index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom:
                index < contributions.length - 1 ? "1px solid #252525" : "none",
              gap: "12px",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {c.full_name ?? "Unknown"}
              </p>
              <p
                style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#888" }}
              >
                {c.created_at ? formatDate(c.created_at) : "—"}
                {c.mode ? ` · ${c.mode}` : ""}
              </p>
            </div>

            <div style={{ textAlign: "right" as const, flexShrink: 0 }}>
              <p
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#4ade80",
                }}
              >
                KES {formatAmount(c.amount ?? 0)}
              </p>
              <StatusBadge status={c.status} />
            </div>
          </div>
        ))}
      </div>

      <Link href="/contributions" passHref>
        <button
          style={{
            background: "#2a2a2a",
            color: "#f0f0f0",
            border: "none",
            borderRadius: "999px",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.15s ease",
            fontFamily: "inherit",
          }}
        >
          See all
        </button>
      </Link>
    </div>
  );
}
