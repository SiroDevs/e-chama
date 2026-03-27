import { GroupMember } from "@/domain/entities";

interface RecentMembersProps {
  members: GroupMember[];
  periodDays?: number;
}

function Avatar({ name, url }: { name: string; url?: string | null }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (url) {
    return (
      <img
        src={url}
        alt={name}
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
          border: "2px solid #2e2e2e",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "#2e2e2e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        fontSize: "15px",
        fontWeight: 600,
        color: "#aaa",
        border: "2px solid #333",
      }}
    >
      {initials}
    </div>
  );
}

export default function RecentMembers({
  members,
  periodDays = 90,
}: RecentMembersProps) {
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
        Recent members
      </p>
      <p style={{ fontSize: "13px", color: "#888", margin: "0 0 20px 0" }}>
        Last {periodDays} days
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        {members.map((member) => {
          return (
            <div
              key={member.id}
              style={{ display: "flex", alignItems: "center", gap: "14px" }}
            >
              <Avatar name={member.full_name!} url={member.avatar} />
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#f0f0f0",
                    lineHeight: 1.3,
                  }}
                >
                  {member.full_name!}
                </p>
                <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "#888" }}>
                  {member.role ?? "Member"} · #{member.member_no ?? "—"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

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