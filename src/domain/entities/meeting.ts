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
  full_name?: string;
  member_no?: string;
  role?: string;
  group_id?: string;
  title?: string;
  description?: string;
  date?: string;
  location?: string;
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
