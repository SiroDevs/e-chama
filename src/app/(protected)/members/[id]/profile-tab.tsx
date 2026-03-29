"use client";

import { MapPin, User, Star, CreditCard, Hash } from "lucide-react";
import { Phone, Mail, BarChart2, Calendar, Venus, Mars } from "lucide-react";

import {
  InfoRow,
  SidebarSection,
  TimelineItem,
} from "@/presentation/components/ui/profile";
import { GroupMember } from "@/domain/entities";
import { capitalize, formatDate } from "@/application/helpers/utils";

function GenderIcon({ sex }: { sex: string | null }) {
  if (sex?.toLowerCase() === "female") return <Venus size={14} />;
  return <Mars size={14} />;
}

export function ProfileTab({ member }: { member: GroupMember }) {
  return (
    <div className="py-3 w-full">
      <div className="flex flex-col md:flex-row gap-3">
        <aside className="md:block md:w-72 shrink-0 rounded-lg p-5 space-y-5 bg-white dark:bg-[#1d1d20] shadow-xs">
          <SidebarSection title="About">
            <ul className="space-y-2.5">
              <InfoRow
                icon={<User size={14} />}
                label="First Name:"
                value={member?.first_name || "-"}
              />
              <InfoRow
                icon={<User size={14} />}
                label="Last Name:"
                value={member?.last_name || "-"}
              />
              <InfoRow
                icon={<Star size={14} />}
                label="Role:"
                value={capitalize(member?.role)}
              />
              <InfoRow
                icon={<Hash size={14} />}
                label="Member No:"
                value={member?.member_no || "-"}
              />
              <InfoRow
                icon={<GenderIcon sex={member?.sex} />}
                label="Gender:"
                value={capitalize(member?.sex)}
              />
              <InfoRow
                icon={<Calendar size={14} />}
                label="Date of Birth:"
                value={formatDate(member?.dob)}
              />
            </ul>
          </SidebarSection>

          <hr className="border-gray-100 dark:border-white/5" />

          <SidebarSection title="Identity">
            <ul className="space-y-2.5">
              <InfoRow
                icon={<CreditCard size={14} />}
                label="ID Number:"
                value={member?.id_number || "-"}
              />
              <InfoRow
                icon={<Hash size={14} />}
                label="KRA PIN:"
                value={member?.kra_pin || "-"}
              />
            </ul>
          </SidebarSection>

          <hr className="border-gray-100 dark:border-white/5" />

          <SidebarSection title="Contacts">
            <ul className="space-y-2.5">
              <InfoRow
                icon={<Phone size={14} />}
                label="Phone:"
                value={member?.phone || "-"}
              />
              <InfoRow
                icon={<Mail size={14} />}
                label="Email:"
                value={member?.email || "-"}
              />
            </ul>
          </SidebarSection>

          <hr className="border-gray-100 dark:border-white/5" />

          <SidebarSection title="Location">
            <ul className="space-y-2.5">
              <InfoRow
                icon={<MapPin size={14} />}
                label="Address:"
                value={member?.address || "-"}
              />
              <InfoRow
                icon={<MapPin size={14} />}
                label="Country:"
                value={member?.country || "-"}
              />
            </ul>
          </SidebarSection>
        </aside>

        <div className="flex-1 rounded-lg p-6 shadow-sm bg-white dark:bg-[#1d1d20] shadow-xs">
          <h2 className="text-base font-bold mb-6 flex items-center gap-2">
            <BarChart2 size={18} /> Activity Timeline
          </h2>

          <div className="relative">
            <div className="absolute left-2.5 top-3 bottom-3 w-px bg-gray-200 dark:bg-white/10" />
            <TimelineItem
              dotColor="bg-violet-500"
              title="Account created"
              time={formatDate(member?.created_at)}
              description="Member profile created and added to the group"
              attachment={{ name: "account creation" }}
            />
            <TimelineItem
              dotColor="bg-green-500"
              title="Account created"
              time={formatDate(member?.joined_at)}
              description="Member joined the group"
              attachment={{ name: "user registration" }}
            />
            {/* <TimelineItem
            dotColor="bg-violet-500"
            title="12 Invoices have been paid"
            time="12 mins ago"
            description="Invoices have been paid to the company"
            attachment={{ name: "invoices.pdf" }}
          />
          <TimelineItem
            dotColor="bg-green-500"
            title="Client meeting"
            time="45 mins ago"
            description="Project meeting with john @10:15am"
            person={{
              name: "Lester McCarthy (Client)",
              role: "CEO of ThemeSelection",
            }}
          />
          <TimelineItem
            dotColor="bg-cyan-400"
            title="Create a new project for client"
            time="2 days ago"
            description="6 team members in a project"
            avatarCount={3}
            extraCount={3}
          /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
