import { integer, primaryKey, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  sourceKey: text("source_key").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  setting: text("setting").notNull(),
  startAt: text("start_at").notNull(),
  endAt: text("end_at"),
  venueName: text("venue_name").notNull().default(""),
  address: text("address").notNull().default(""),
  city: text("city").notNull(),
  distance: real("distance").notNull(),
  age: text("age").notNull(),
  minAgeMonths: integer("min_age_months").notNull().default(0),
  maxAgeMonths: integer("max_age_months").notNull().default(216),
  price: text("price").notNull(),
  reservation: text("reservation").notNull(),
  sourceUrl: text("source_url").notNull(),
  sourceName: text("source_name").notNull(),
  verifiedAt: text("verified_at").notNull(),
  why: text("why").notNull(),
  notesJson: text("notes_json").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  confidenceStatus: text("confidence_status").notNull().default("source_confirmed"),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  lastSeenAt: text("last_seen_at").notNull(),
});

export const syncState = sqliteTable("sync_state", {
  sourceKey: text("source_key").primaryKey(),
  status: text("status").notNull(),
  lastAttemptAt: text("last_attempt_at").notNull(),
  lastSuccessAt: text("last_success_at"),
  message: text("message"),
  eventCount: integer("event_count").notNull().default(0),
});

export const sharedPlans = sqliteTable("shared_plans", {
  viewToken: text("view_token").primaryKey(),
  editTokenHash: text("edit_token_hash").notNull(),
  title: text("title").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const sharedPlanItems = sqliteTable("shared_plan_items", {
  planToken: text("plan_token").notNull().references(() => sharedPlans.viewToken, { onDelete: "cascade" }),
  itemId: text("item_id").notNull(),
  position: integer("position").notNull(),
  snapshotJson: text("snapshot_json").notNull(),
}, (table) => [primaryKey({ columns: [table.planToken, table.itemId] })]);

export const sharedPlanResponses = sqliteTable("shared_plan_responses", {
  planToken: text("plan_token").notNull(),
  itemId: text("item_id").notNull(),
  participantId: text("participant_id").notNull(),
  participantName: text("participant_name").notNull(),
  response: text("response").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [primaryKey({ columns: [table.planToken, table.itemId, table.participantId] })]);
