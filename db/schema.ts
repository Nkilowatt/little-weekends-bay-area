import { index, integer, primaryKey, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
  placeKey: text("place_key").notNull().default(""),
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
}, (table) => [
  index("events_place_key_idx").on(table.placeKey),
]);

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

export const placeImageSources = sqliteTable("place_image_sources", {
  placeKey: text("place_key").primaryKey(),
  googlePlaceId: text("google_place_id"),
  matchStatus: text("match_status").notNull(),
  matchedName: text("matched_name"),
  matchedAddress: text("matched_address"),
  matchedLatitude: real("matched_latitude"),
  matchedLongitude: real("matched_longitude"),
  distanceMeters: real("distance_meters"),
  checkedAt: text("checked_at").notNull(),
});

export const feedbackSubmissions = sqliteTable("feedback_submissions", {
  id: text("id").primaryKey(),
  requestId: text("request_id").notNull().unique(),
  category: text("category").notNull(),
  message: text("message").notNull(),
  email: text("email"),
  contextJson: text("context_json").notNull().default("{}"),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull(),
}, (table) => [
  index("feedback_submissions_status_created_idx").on(table.status, table.createdAt),
]);

export const placePhotoSubmissions = sqliteTable("place_photo_submissions", {
  id: text("id").primaryKey(),
  requestId: text("request_id").notNull().unique(),
  placeKey: text("place_key").notNull(),
  placeName: text("place_name").notNull(),
  objectKey: text("object_key"),
  status: text("status").notNull(),
  contentType: text("content_type").notNull(),
  byteSize: integer("byte_size").notNull(),
  takenOn: text("taken_on"),
  deviceHash: text("device_hash").notNull(),
  retryTokenHash: text("retry_token_hash").notNull().default(""),
  manageTokenHash: text("manage_token_hash").notNull(),
  consentVersion: text("consent_version").notNull(),
  consentAt: text("consent_at").notNull(),
  createdAt: text("created_at").notNull(),
  reviewedAt: text("reviewed_at"),
  reviewerUserId: text("reviewer_user_id"),
  rejectionReason: text("rejection_reason"),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  deletedAt: text("deleted_at"),
}, (table) => [
  index("place_photo_submissions_status_created_idx").on(table.status, table.createdAt),
  index("place_photo_submissions_place_status_featured_idx").on(table.placeKey, table.status, table.isFeatured, table.reviewedAt),
  index("place_photo_submissions_device_created_idx").on(table.deviceHash, table.createdAt),
]);

export const placePhotoReports = sqliteTable("place_photo_reports", {
  id: text("id").primaryKey(),
  requestId: text("request_id").notNull().unique(),
  photoId: text("photo_id").notNull(),
  placeKey: text("place_key").notNull(),
  message: text("message").notNull(),
  email: text("email"),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull(),
  resolvedAt: text("resolved_at"),
  resolvedByUserId: text("resolved_by_user_id"),
  resolution: text("resolution"),
}, (table) => [
  index("place_photo_reports_status_created_idx").on(table.status, table.createdAt),
  index("place_photo_reports_photo_status_idx").on(table.photoId, table.status),
]);
