import { DatabaseFilters } from "@/types/general";

export interface Meeting {
  id?: string;
  creator?: string;
  group_id?: string;
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GroupMeeting {
  id?: string;
  creator?: string;
  group_id?: string;
  title?: string;
  amount?: number;
  date?: string;
  location?: string;
  status?: string;
  attachment?: string;
  description?: string;
  note?: string;
  user_id?: string;
  full_name?: string;
  member_no?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MeetingsResp {
  data: Meeting[];
  count: number;
  error: Error | null;
}

export interface GrpMeetingsResp {
  data: GroupMeeting[];
  count: number;
  error: Error | null;
}
