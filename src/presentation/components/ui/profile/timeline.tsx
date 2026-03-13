import { Paperclip } from "lucide-react";
import { InfoRowProps, TimelineItemProps } from ".";
import { GenericAvatar } from "../avatar";

function TabButton({
  tab,
  active,
  onClick,
}: {
  tab: Tab;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-xl border-b-2 ${
        active
          ? "border-blue-500 text-white bg-blue-500 dark:bg-blue-600"
          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"
      }`}
    >
      {TAB_ICONS[tab]}
      {tab}
    </button>
  );
}

export function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <span className="text-gray-400 dark:text-gray-500 w-4 shrink-0">
        {icon}
      </span>
      <span className="text-gray-500 dark:text-gray-400 shrink-0">{label}</span>
      <span className="text-gray-800 dark:text-white font-medium">{value}</span>
    </li>
  );
}

export function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
        {title}
      </p>
      {children}
    </section>
  );
}

export function TimelineItem({
  dotColor,
  title,
  time,
  description,
  attachment,
  person,
  avatarCount = 0,
  extraCount,
}: TimelineItemProps) {
  return (
    <div className="relative pl-10 pb-8 last:pb-0">
      <div
        className={`absolute left-0 top-1 w-5 h-5 rounded-full ${dotColor} ring-4 ring-white dark:ring-[#2a2d3e] flex items-center justify-center`}
      >
        <div className="w-2 h-2 rounded-full bg-white/60" />
      </div>

      <div className="flex items-start justify-between gap-4">
        <p className="font-bold text-gray-800 dark:text-white text-sm">
          {title}
        </p>
        <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
          {time}
        </span>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {description}
      </p>

      {attachment && (
        <div className="mt-2 flex items-center gap-1.5 text-sm text-red-500 dark:text-red-400">
          <Paperclip size={13} />
          <span className="hover:underline cursor-pointer">
            {attachment.name}
          </span>
        </div>
      )}

      {person && (
        <div className="mt-3 flex items-center gap-3">
          <GenericAvatar size={36} />
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              {person.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {person.role}
            </p>
          </div>
        </div>
      )}

      {avatarCount > 0 && (
        <div className="mt-3 flex items-center">
          {Array.from({ length: Math.min(avatarCount, 3) }).map((_, i) => (
            <div
              key={i}
              className="-ml-1 first:ml-0 ring-2 ring-white dark:ring-[#2a2d3e] rounded-full"
            >
              <GenericAvatar size={32} />
            </div>
          ))}
          {extraCount && (
            <div className="w-8 h-8 rounded-full bg-violet-600 ring-2 ring-white dark:ring-[#2a2d3e] -ml-1 flex items-center justify-center text-xs font-bold text-white">
              +{extraCount}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
