"use client";

import { MapPin, User, Check, Star } from "lucide-react";
import { Languages, Phone, MessageCircle, Mail, BarChart2 } from "lucide-react";

import {
  InfoRow,
  SidebarSection,
  TimelineItem,
} from "@/presentation/components/ui/profile";

export default function ProfileTab() {
  return (
    <div className="py-3 flex gap-3 max-w-6xl">
      <aside className="w-72 shrink-0 rounded-lg p-5 space-y-5 bg-white dark:bg-[#1d1d20] shadow-xs">
        <SidebarSection title="About">
          <ul className="space-y-2.5">
            <InfoRow
              icon={<User size={14} />}
              label="Full Name:"
              value="John Doe"
            />
            <InfoRow
              icon={<Check size={14} />}
              label="Status:"
              value="Active"
            />
            <InfoRow
              icon={<Star size={14} />}
              label="Role:"
              value="Developer"
            />
            <InfoRow icon={<MapPin size={14} />} label="Country:" value="USA" />
            <InfoRow
              icon={<Languages size={14} />}
              label="Languages:"
              value="English"
            />
          </ul>
        </SidebarSection>

        <hr className="border-gray-100 dark:border-white/5" />

        <SidebarSection title="Contacts">
          <ul className="space-y-2.5">
            <InfoRow
              icon={<Phone size={14} />}
              label="Contact:"
              value="(123) 456-7890"
            />
            <InfoRow
              icon={<MessageCircle size={14} />}
              label="Skype:"
              value="john.doe"
            />
            <InfoRow
              icon={<Mail size={14} />}
              label="Email:"
              value="john.doe@example.com"
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
          />
        </div>
      </div>
    </div>
  );
}
