CREATE TABLE IF NOT EXISTS shared_plans (
  view_token TEXT PRIMARY KEY NOT NULL,
  edit_token_hash TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS shared_plan_items (
  plan_token TEXT NOT NULL,
  item_id TEXT NOT NULL,
  position INTEGER NOT NULL,
  snapshot_json TEXT NOT NULL,
  PRIMARY KEY (plan_token, item_id),
  FOREIGN KEY (plan_token) REFERENCES shared_plans(view_token) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS shared_plan_items_position_idx ON shared_plan_items (plan_token, position);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS shared_plan_responses (
  plan_token TEXT NOT NULL,
  item_id TEXT NOT NULL,
  participant_id TEXT NOT NULL,
  participant_name TEXT NOT NULL,
  response TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (plan_token, item_id, participant_id),
  FOREIGN KEY (plan_token, item_id) REFERENCES shared_plan_items(plan_token, item_id) ON DELETE CASCADE
);
