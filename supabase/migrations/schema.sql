


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."create_user_on_signup"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.permissions (id, created_at, role)
  VALUES (
    NEW.id,
    CURRENT_TIMESTAMP,
    'user' -- Default role for new users
  );
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."create_user_on_signup"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_admin"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
  RETURN (
    SELECT role FROM public.permissions 
    WHERE permissions.id = (SELECT auth.uid())
  ) = 'admin';
END;$$;


ALTER FUNCTION "public"."is_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_user"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
  RETURN (
    SELECT role FROM public.permissions 
    WHERE permissions.id = (SELECT auth.uid())
  ) = 'user';
END;$$;


ALTER FUNCTION "public"."is_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."prevent_group_deletion_with_members"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Check if the group has any members
  IF EXISTS (
    SELECT 1 FROM public.members 
    WHERE group_id = OLD.id
  ) THEN
    RAISE EXCEPTION 'Cannot delete group "%" (ID: %) because it still has members. Remove all members first.', OLD.title, OLD.id;
  END IF;
  RETURN OLD;
END;
$$;


ALTER FUNCTION "public"."prevent_group_deletion_with_members"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_status_timestamp"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.accepted_rejected_status_at := CURRENT_TIMESTAMP;
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_status_timestamp"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."announcements" (
    "id" integer NOT NULL,
    "member_id" integer NOT NULL,
    "group_id" integer NOT NULL,
    "title" character varying(255) NOT NULL,
    "message" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."announcements" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."announcements_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."announcements_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."announcements_id_seq" OWNED BY "public"."announcements"."id";



CREATE TABLE IF NOT EXISTS "public"."contributions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "group_id" "uuid",
    "member_id" "uuid" NOT NULL,
    "reason" character varying(255) NOT NULL,
    "amount" numeric(10,2) NOT NULL,
    "mode" character varying(50),
    "reference" character varying(255),
    "status" character varying(50) DEFAULT 'pending'::character varying,
    "attachment" "text",
    "details" "text",
    "note" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."contributions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."events" (
    "id" integer NOT NULL,
    "member_id" integer NOT NULL,
    "group_id" integer NOT NULL,
    "title" character varying(255) NOT NULL,
    "description" "text",
    "date" timestamp with time zone NOT NULL,
    "location" character varying(255),
    "status" character varying(50) DEFAULT 'scheduled'::character varying,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."events" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."events_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."events_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."events_id_seq" OWNED BY "public"."events"."id";



CREATE TABLE IF NOT EXISTS "public"."members" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "group_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "member_no" character varying(50) DEFAULT NULL::character varying,
    "role" character varying DEFAULT 'member'::character varying,
    "joined_at" "date",
    "field1" character varying,
    "field2" character varying,
    "field3" character varying,
    "field4" character varying,
    "field5" character varying,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."members" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "first_name" character varying,
    "last_name" character varying,
    "id_number" character varying,
    "kra_pin" character varying,
    "country" character varying,
    "address" "text",
    "sex" "text",
    "dob" "date",
    "avatar" "text",
    "group_id" "uuid",
    "field2" "text",
    "field3" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."group_contributions" AS
 SELECT "concat"("p"."first_name", ' ', "p"."last_name") AS "full_name",
    "m"."member_no",
    "c"."reason",
    "c"."amount",
    "c"."mode",
    "c"."reference",
    "c"."status",
    "c"."attachment",
    "c"."details",
    "c"."note",
    "m"."role",
    "c"."id",
    "p"."id" AS "user_id",
    "c"."group_id",
    "c"."member_id",
    "c"."created_at",
    "c"."updated_at"
   FROM (("public"."contributions" "c"
     LEFT JOIN "public"."members" "m" ON (("c"."member_id" = "m"."id")))
     LEFT JOIN "public"."profiles" "p" ON (("m"."user_id" = "p"."id")))
  WHERE ("c"."group_id" IS NOT NULL);


ALTER VIEW "public"."group_contributions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."meeting_minutes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "member_id" "uuid" NOT NULL,
    "meeting_id" "uuid" NOT NULL,
    "minute" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."meeting_minutes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."meetings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "creator" "uuid" NOT NULL,
    "group_id" "uuid" NOT NULL,
    "title" character varying(255) NOT NULL,
    "description" "text",
    "date" character varying(255),
    "location" character varying(255),
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."meetings" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."group_meeting_minutes" AS
 SELECT "mm"."id",
    "concat"("p"."first_name", ' ', "p"."last_name") AS "full_name",
    "mb"."member_no",
    "mb"."role",
    "mt"."id" AS "meeting_id",
    "mt"."title" AS "meeting_title",
    "mt"."date" AS "meeting_date",
    "mm"."minute",
    "mm"."created_at",
    "mm"."updated_at"
   FROM ((("public"."meeting_minutes" "mm"
     LEFT JOIN "public"."meetings" "mt" ON (("mm"."meeting_id" = "mt"."id")))
     LEFT JOIN "public"."members" "mb" ON (("mm"."member_id" = "mb"."id")))
     LEFT JOIN "public"."profiles" "p" ON (("mb"."user_id" = "p"."id")))
  ORDER BY "mt"."date" DESC, "mm"."created_at" DESC;


ALTER VIEW "public"."group_meeting_minutes" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."group_meetings" AS
 SELECT "mt"."id",
    "mt"."creator",
    "concat"("p"."first_name", ' ', "p"."last_name") AS "full_name",
    "mb"."member_no",
    "mb"."role",
    "mt"."group_id",
    "mt"."title",
    "mt"."description",
    "mt"."date",
    "mt"."location",
    "mt"."created_at",
    "mt"."updated_at"
   FROM (("public"."meetings" "mt"
     LEFT JOIN "public"."members" "mb" ON (("mt"."creator" = "mb"."id")))
     LEFT JOIN "public"."profiles" "p" ON (("mb"."user_id" = "p"."id")));


ALTER VIEW "public"."group_meetings" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."group_members" AS
 SELECT "m"."member_no",
    "concat"("p"."first_name", ' ', "p"."last_name") AS "full_name",
    "m"."role",
    "p"."first_name",
    "p"."last_name",
    "u"."phone",
    "u"."email",
    "p"."id_number",
    "p"."kra_pin",
    "p"."country",
    "p"."address",
    "p"."sex",
    "p"."dob",
    "p"."avatar",
    "m"."joined_at",
    "m"."id",
    "m"."user_id",
    "m"."group_id",
    "m"."created_at",
    "m"."updated_at",
        CASE
            WHEN ("m"."id" IS NOT NULL) THEN true
            ELSE false
        END AS "is_member"
   FROM (("auth"."users" "u"
     LEFT JOIN "public"."profiles" "p" ON (("u"."id" = "p"."id")))
     LEFT JOIN "public"."members" "m" ON (("u"."id" = "m"."user_id")));


ALTER VIEW "public"."group_members" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."group_requests" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "group_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "request" "text" NOT NULL,
    "status" character varying(20) DEFAULT 'pending'::character varying,
    "note" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone,
    CONSTRAINT "group_requests_status_check" CHECK ((("status")::"text" = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::"text"[])))
);


ALTER TABLE "public"."group_requests" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."groups" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "owner" "uuid" NOT NULL,
    "title" character varying(255) NOT NULL,
    "description" "text",
    "avatar" "text",
    "initials" character varying,
    "location" character varying,
    "address" character varying,
    "code" character varying,
    "private" boolean DEFAULT true,
    "restricted" boolean DEFAULT true,
    "field2" "text",
    "field3" "text",
    "field4" "text",
    "field5" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."groups" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."loans" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "member_id" "uuid" NOT NULL,
    "amount" numeric(10,2) NOT NULL,
    "interest_rate" numeric(5,2) DEFAULT 0,
    "status" character varying(50) DEFAULT 'pending'::character varying,
    "purpose" "text",
    "repayment_period" integer,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."loans" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."meeting_attendants" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "member_id" "uuid" NOT NULL,
    "meeting_id" "uuid" NOT NULL,
    "attendance" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone,
    CONSTRAINT "meeting_attendants_attendance_check" CHECK (("attendance" = ANY (ARRAY[0, 1, 2])))
);


ALTER TABLE "public"."meeting_attendants" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."meeting_attendancy" AS
 SELECT "mt"."date",
    "mt"."title",
    "concat"("p"."first_name", ' ', "p"."last_name") AS "full_name",
    "mb"."member_no",
    "mb"."role",
    "mt"."location",
    "ma"."attendance",
    "ma"."id",
    "ma"."created_at",
    "ma"."updated_at"
   FROM ((("public"."meeting_attendants" "ma"
     LEFT JOIN "public"."meetings" "mt" ON (("mt"."id" = "ma"."meeting_id")))
     LEFT JOIN "public"."members" "mb" ON (("ma"."member_id" = "mb"."id")))
     LEFT JOIN "public"."profiles" "p" ON (("mb"."user_id" = "p"."id")));


ALTER VIEW "public"."meeting_attendancy" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."permissions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "role" "text" NOT NULL
);


ALTER TABLE "public"."permissions" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."user_groups" AS
 SELECT "m"."user_id",
    "m"."id" AS "member_id",
    "g"."id" AS "group_id",
    "g"."title",
    "g"."initials",
    "g"."location",
    "g"."address",
    "g"."description",
    "g"."avatar",
    "g"."owner",
    "g"."created_at",
    "g"."updated_at",
    "m"."role",
    "m"."member_no",
    "m"."joined_at"
   FROM ("public"."members" "m"
     JOIN "public"."groups" "g" ON (("m"."group_id" = "g"."id")));


ALTER VIEW "public"."user_groups" OWNER TO "postgres";


ALTER TABLE ONLY "public"."announcements" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."announcements_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."events" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."events_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."announcements"
    ADD CONSTRAINT "announcements_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."contributions"
    ADD CONSTRAINT "contributions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."group_requests"
    ADD CONSTRAINT "group_requests_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."group_requests"
    ADD CONSTRAINT "group_requests_unique_request" UNIQUE ("group_id", "user_id");



ALTER TABLE ONLY "public"."groups"
    ADD CONSTRAINT "groups_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."loans"
    ADD CONSTRAINT "loans_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."meeting_attendants"
    ADD CONSTRAINT "meeting_attendants_member_id_meeting_id_key" UNIQUE ("member_id", "meeting_id");



ALTER TABLE ONLY "public"."meeting_attendants"
    ADD CONSTRAINT "meeting_attendants_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."meeting_minutes"
    ADD CONSTRAINT "meeting_minutes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."meetings"
    ADD CONSTRAINT "meetings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_group_id_user_id_key" UNIQUE ("group_id", "user_id");



ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."permissions"
    ADD CONSTRAINT "permissions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_announcements_created_at" ON "public"."announcements" USING "btree" ("created_at");



CREATE INDEX "idx_announcements_group_id" ON "public"."announcements" USING "btree" ("group_id");



CREATE INDEX "idx_announcements_member_id" ON "public"."announcements" USING "btree" ("member_id");



CREATE INDEX "idx_contributions_member" ON "public"."contributions" USING "btree" ("member_id");



CREATE INDEX "idx_events_date" ON "public"."events" USING "btree" ("date");



CREATE INDEX "idx_events_group_id" ON "public"."events" USING "btree" ("group_id");



CREATE INDEX "idx_events_member_id" ON "public"."events" USING "btree" ("member_id");



CREATE INDEX "idx_group_requests_created_at" ON "public"."group_requests" USING "btree" ("created_at");



CREATE INDEX "idx_group_requests_group_id" ON "public"."group_requests" USING "btree" ("group_id");



CREATE INDEX "idx_group_requests_status" ON "public"."group_requests" USING "btree" ("status");



CREATE INDEX "idx_group_requests_user_id" ON "public"."group_requests" USING "btree" ("user_id");



CREATE INDEX "idx_groups_owner" ON "public"."groups" USING "btree" ("owner");



CREATE INDEX "idx_loans_member" ON "public"."loans" USING "btree" ("member_id");



CREATE INDEX "idx_meeting_attendants_composite" ON "public"."meeting_attendants" USING "btree" ("meeting_id", "member_id");



CREATE INDEX "idx_meeting_attendants_meeting_id" ON "public"."meeting_attendants" USING "btree" ("meeting_id");



CREATE INDEX "idx_meeting_attendants_member_id" ON "public"."meeting_attendants" USING "btree" ("member_id");



CREATE INDEX "idx_meeting_minutes_composite" ON "public"."meeting_minutes" USING "btree" ("meeting_id", "member_id");



CREATE INDEX "idx_meeting_minutes_meeting_id" ON "public"."meeting_minutes" USING "btree" ("meeting_id");



CREATE INDEX "idx_meeting_minutes_member_id" ON "public"."meeting_minutes" USING "btree" ("member_id");



CREATE INDEX "idx_meetings_creator" ON "public"."meetings" USING "btree" ("creator");



CREATE INDEX "idx_meetings_group_id" ON "public"."meetings" USING "btree" ("group_id");



CREATE INDEX "idx_members_group" ON "public"."members" USING "btree" ("group_id");



CREATE INDEX "idx_members_user" ON "public"."members" USING "btree" ("user_id");



CREATE OR REPLACE TRIGGER "prevent_group_deletion_with_members_trigger" BEFORE DELETE ON "public"."groups" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_group_deletion_with_members"();



CREATE OR REPLACE TRIGGER "update_announcements_updated_at" BEFORE UPDATE ON "public"."announcements" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_contributions_updated_at" BEFORE UPDATE ON "public"."contributions" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_events_updated_at" BEFORE UPDATE ON "public"."events" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_group_requests_updated_at" BEFORE UPDATE ON "public"."group_requests" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_groups_updated_at" BEFORE UPDATE ON "public"."groups" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_loans_updated_at" BEFORE UPDATE ON "public"."loans" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_members_updated_at" BEFORE UPDATE ON "public"."members" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."group_requests"
    ADD CONSTRAINT "group_requests_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."group_requests"
    ADD CONSTRAINT "group_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."groups"
    ADD CONSTRAINT "groups_owner_fkey" FOREIGN KEY ("owner") REFERENCES "public"."profiles"("id");



ALTER TABLE ONLY "public"."meeting_attendants"
    ADD CONSTRAINT "meeting_attendants_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."meeting_attendants"
    ADD CONSTRAINT "meeting_attendants_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."meeting_minutes"
    ADD CONSTRAINT "meeting_minutes_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."meeting_minutes"
    ADD CONSTRAINT "meeting_minutes_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."meetings"
    ADD CONSTRAINT "meetings_creator_fkey" FOREIGN KEY ("creator") REFERENCES "public"."members"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."meetings"
    ADD CONSTRAINT "meetings_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");



CREATE POLICY "Attendants Policy" ON "public"."meeting_attendants" USING (true);



CREATE POLICY "Meetings Policy" ON "public"."meetings" USING (true);



CREATE POLICY "Minutes Policy" ON "public"."meeting_minutes" USING (true);



ALTER TABLE "public"."announcements" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "announcements_policy" ON "public"."announcements" USING (true);



ALTER TABLE "public"."contributions" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "contributions_policy" ON "public"."contributions" USING (true);



ALTER TABLE "public"."events" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "events_policy" ON "public"."events" USING (true);



ALTER TABLE "public"."group_requests" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "group_requests_policy" ON "public"."group_requests" USING (true);



ALTER TABLE "public"."groups" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "groups_policy" ON "public"."groups" USING (true);



ALTER TABLE "public"."loans" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "loans_policy" ON "public"."loans" USING (true);



ALTER TABLE "public"."meeting_attendants" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."meeting_minutes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."meetings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."members" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "members_policy" ON "public"."members" USING (true);



ALTER TABLE "public"."permissions" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "permissions_policy" ON "public"."permissions" USING (true);



ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "profiles_policy" ON "public"."profiles" USING (true);





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."create_user_on_signup"() TO "anon";
GRANT ALL ON FUNCTION "public"."create_user_on_signup"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_user_on_signup"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."prevent_group_deletion_with_members"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_group_deletion_with_members"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_group_deletion_with_members"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_status_timestamp"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_status_timestamp"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_status_timestamp"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";


















GRANT ALL ON TABLE "public"."announcements" TO "anon";
GRANT ALL ON TABLE "public"."announcements" TO "authenticated";
GRANT ALL ON TABLE "public"."announcements" TO "service_role";



GRANT ALL ON SEQUENCE "public"."announcements_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."announcements_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."announcements_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."contributions" TO "anon";
GRANT ALL ON TABLE "public"."contributions" TO "authenticated";
GRANT ALL ON TABLE "public"."contributions" TO "service_role";



GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";



GRANT ALL ON SEQUENCE "public"."events_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."events_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."events_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."members" TO "anon";
GRANT ALL ON TABLE "public"."members" TO "authenticated";
GRANT ALL ON TABLE "public"."members" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."group_contributions" TO "anon";
GRANT ALL ON TABLE "public"."group_contributions" TO "authenticated";
GRANT ALL ON TABLE "public"."group_contributions" TO "service_role";



GRANT ALL ON TABLE "public"."meeting_minutes" TO "anon";
GRANT ALL ON TABLE "public"."meeting_minutes" TO "authenticated";
GRANT ALL ON TABLE "public"."meeting_minutes" TO "service_role";



GRANT ALL ON TABLE "public"."meetings" TO "anon";
GRANT ALL ON TABLE "public"."meetings" TO "authenticated";
GRANT ALL ON TABLE "public"."meetings" TO "service_role";



GRANT ALL ON TABLE "public"."group_meeting_minutes" TO "anon";
GRANT ALL ON TABLE "public"."group_meeting_minutes" TO "authenticated";
GRANT ALL ON TABLE "public"."group_meeting_minutes" TO "service_role";



GRANT ALL ON TABLE "public"."group_meetings" TO "anon";
GRANT ALL ON TABLE "public"."group_meetings" TO "authenticated";
GRANT ALL ON TABLE "public"."group_meetings" TO "service_role";



GRANT ALL ON TABLE "public"."group_members" TO "anon";
GRANT ALL ON TABLE "public"."group_members" TO "authenticated";
GRANT ALL ON TABLE "public"."group_members" TO "service_role";



GRANT ALL ON TABLE "public"."group_requests" TO "anon";
GRANT ALL ON TABLE "public"."group_requests" TO "authenticated";
GRANT ALL ON TABLE "public"."group_requests" TO "service_role";



GRANT ALL ON TABLE "public"."groups" TO "anon";
GRANT ALL ON TABLE "public"."groups" TO "authenticated";
GRANT ALL ON TABLE "public"."groups" TO "service_role";



GRANT ALL ON TABLE "public"."loans" TO "anon";
GRANT ALL ON TABLE "public"."loans" TO "authenticated";
GRANT ALL ON TABLE "public"."loans" TO "service_role";



GRANT ALL ON TABLE "public"."meeting_attendants" TO "anon";
GRANT ALL ON TABLE "public"."meeting_attendants" TO "authenticated";
GRANT ALL ON TABLE "public"."meeting_attendants" TO "service_role";



GRANT ALL ON TABLE "public"."meeting_attendancy" TO "anon";
GRANT ALL ON TABLE "public"."meeting_attendancy" TO "authenticated";
GRANT ALL ON TABLE "public"."meeting_attendancy" TO "service_role";



GRANT ALL ON TABLE "public"."permissions" TO "anon";
GRANT ALL ON TABLE "public"."permissions" TO "authenticated";
GRANT ALL ON TABLE "public"."permissions" TO "service_role";



GRANT ALL ON TABLE "public"."user_groups" TO "anon";
GRANT ALL ON TABLE "public"."user_groups" TO "authenticated";
GRANT ALL ON TABLE "public"."user_groups" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































