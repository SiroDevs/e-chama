import { CheckCircle2, TrendingUp } from "lucide-react";

interface GroupAnalyticsProps {
  members: number;
  memberGrowth: number;
  contributions: number;
  loans: number;
  periodDays?: number;
}

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
}

export default function GroupAnalytics({
  members = 1591,
  memberGrowth = 26,
  contributions = 2700,
  loans = 198.5,
  periodDays = 28,
}: GroupAnalyticsProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 p-5 rounded-lg"
      style={{
        borderRadius: "16px",
        width: "100%",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        boxSizing: "border-box" as const,
      }}
    >
      <p
        style={{
          fontSize: "18px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          margin: "0 0 18px 0",
        }}
      >
        Group analytics
      </p>

      <p style={{ fontSize: "12px", color: "#aaa", margin: "0 0 4px 0" }}>
        Total members
      </p>
      <p
        style={{
          fontSize: "48px",
          fontWeight: 700,
          margin: "0 0 6px 0",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        }}
      >
        {members.toLocaleString()}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginBottom: "24px",
        }}
      >
        <TrendingUp size={14} color="#4ade80" strokeWidth={2.5} />
        <span style={{ color: "#4ade80", fontSize: "13px", fontWeight: 600 }}>
          +{memberGrowth}
        </span>
        <span style={{ color: "#777", fontSize: "13px" }}>
          in last {periodDays} days
        </span>
      </div>

      <div
        style={{
          borderTop: "1px solid #2e2e2e",
          marginBottom: "20px",
        }}
      />

      <p
        style={{
          fontSize: "15px",
          fontWeight: 600,
          margin: "0 0 4px 0",
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        }}
      >
        Summary
      </p>
      <p style={{ fontSize: "12px", color: "#777", margin: "0 0 16px 0" }}>
        Last {periodDays} days
      </p>

      {[
        { label: "Contributions", value: formatNumber(contributions) },
        { label: "Loans repayment", value: loans.toLocaleString() },
      ].map(({ label, value }) => (
        <div 
          key={label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: "1px solid #252525",
          }}
        >
          <span style={{ fontSize: "14px", color: "#ccc" }}>{label}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#f0f0f0",
                fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
              }}
            >
              {value}
            </span>
            <CheckCircle2 size={18} color="#4ade80" strokeWidth={2} />
          </div>
        </div>
      ))}
    </div>
  );
}