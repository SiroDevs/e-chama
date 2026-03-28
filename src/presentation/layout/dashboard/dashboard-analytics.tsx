import { CheckCircle2, TrendingUp } from "lucide-react";

interface SummaryItem {
  label: string;
  value: string | number;
}

interface DashboardAnalyticsProps {
  title: string;
  metricLabel: string;
  metricValue: number;
  metricGrowth: number;
  summaryItems: SummaryItem[];
  periodDays?: number;
}

export function DashboardAnalytics({
  title,
  metricLabel,
  metricValue,
  metricGrowth,
  summaryItems,
  periodDays = 28,
}: DashboardAnalyticsProps) {
  return (
    <div
      className="border border-gray-200 dark:border-gray-800 p-5 rounded-lg"
      style={{
        borderRadius: "16px",
        width: "100%",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        boxSizing: "border-box" as const,
      }}
    >
      <p style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "0.08em", margin: "0 0 18px 0" }}>
        {title}
      </p>

      <p style={{ fontSize: "12px", color: "#aaa", margin: "0 0 4px 0" }}>
        {metricLabel}
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
        {metricValue.toLocaleString()}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "24px" }}>
        <TrendingUp size={14} color="#4ade80" strokeWidth={2.5} />
        <span style={{ color: "#4ade80", fontSize: "13px", fontWeight: 600 }}>
          +{metricGrowth}
        </span>
        <span style={{ color: "#777", fontSize: "13px" }}>in last {periodDays} days</span>
      </div>

      <div style={{ borderTop: "1px solid #2e2e2e", marginBottom: "20px" }} />

      <p style={{ fontSize: "15px", fontWeight: 600, margin: "0 0 4px 0" }}>
        Summary
      </p>
      <p style={{ fontSize: "12px", color: "#777", margin: "0 0 16px 0" }}>
        Last {periodDays} days
      </p>

      {summaryItems.map(({ label, value }) => (
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
          <span style={{ fontSize: "14px" }}>{label}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600 }}>
              {value}
            </span>
            <CheckCircle2 size={18} color="#4ade80" strokeWidth={2} />
          </div>
        </div>
      ))}
    </div>
  );
}