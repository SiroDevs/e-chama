
export default function MonthlyMeetings() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 p-5 rounded-lg"
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
        Montly Meetings
      </p>
      <p style={{ fontSize: "13px", color: "#888", margin: "0 0 20px 0" }}>
        No montly meeting data is available
      </p>

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
    </div>
  );
}